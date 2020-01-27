import { Editor } from "slate";
import { isMod } from "../helper/keyboard-event";

export default function KeyboardBehavior() {
  function onKeyDown(
    ev: React.KeyboardEvent<any>,
    editor: Editor,
    next: Function
  ) {
    if (isMod(ev)) return next();

    switch (ev.key) {
      case "Enter":
        return onEnter(ev, editor, next);
      case "Tab":
        return onTab(ev, editor, next);
      case "Backspace":
        return onBackspace(ev, editor, next);
      default:
        return next();
    }
  }

  function onEnter(
    ev: React.KeyboardEvent<any>,
    editor: Editor,
    next: Function
  ) {
    const { value } = editor;
    const { startBlock, selection } = value;
    if (selection.isExpanded) return next();
    if (!startBlock) return next();

    const endOffset = selection.end.offset;

    // Hitting enter while an image is selected should jump caret below and
    // insert a new paragraph
    if (startBlock.type === "image") {
      ev.preventDefault();
      return editor.splitBlock(10).setBlocks({
        type: "paragraph",
        text: ""
      });
    }

    if (startBlock.type.match(/(heading|block-quote)/)) {
      ev.preventDefault();

      // Hitting enter in a heading or blockquote will split the node at that
      // point and make the new node a paragraph
      if (endOffset > 0) {
        return editor.splitBlock().setBlocks("paragraph");
      } else {
        return editor
          .splitBlock()
          .moveToStartOfPreviousBlock()
          .setBlocks("paragraph");
      }
    }

    return next();
  }

  function onTab(ev: React.KeyboardEvent<any>, editor: Editor, next: Function) {
    const { value } = editor;
    const { startBlock } = value;
    if (!startBlock) return next();

    // On tab, if at the end of the heading jump to the main body content
    // as if it is another input field (act the same as enter).
    if (startBlock.type === "heading1") {
      ev.preventDefault();
      return editor.splitBlock().setBlocks("paragraph");
    }

    return next();
  }

  function onBackspace(
    ev: React.KeyboardEvent<any>,
    editor: Editor,
    next: Function
  ) {
    const { value } = editor;
    const { startBlock, selection } = value;
    if (!startBlock) return next();

    // If image or embed is selected go ahead and delete the whole block
    if (
      startBlock.type === "image" ||
      startBlock.type === "link" ||
      // check embed node. embed is also a part of link, since embeds are mostly urls.
      (value.previousBlock && value.previousBlock.toJS().type === "link")
    ) {
      ev.preventDefault();
      editor.removeNodeByKey(value.previousBlock.key);
      return editor.removeNodeByKey(startBlock.key).moveToStartOfNextBlock();
    }

    if (selection.isExpanded) {
      return next();
    }

    // If at the start of a non-paragraph, convert it back into a paragraph
    if (selection.start.offset === 0) {
      if (startBlock.type === "paragraph" || startBlock.type === "code-line")
        return next();
      ev.preventDefault();

      editor.setBlocks("paragraph");

      if (startBlock.type === "list-item") {
        editor.unwrapBlock("bulleted-list");
      }

      return;
    }

    if (selection.isCollapsed) {
      const marksAtCursor = startBlock.getMarksAtRange(selection);
      const codeMarksAtCursor = marksAtCursor.filter(
        mark => mark.type === "code"
      );

      // If at the end of a code mark hitting backspace should remove the mark
      if (codeMarksAtCursor.size > 0) {
        ev.preventDefault();

        let iterationOffset = 0;
        const startOffset = selection.start.offset;
        const textNode = startBlock.getTextAtOffset(startOffset);
        if (!textNode) return next();
        // @ts-ignore
        const leavesUntilCode = textNode.leaves.takeUntil(v => {
          iterationOffset += v.text.length;
          return iterationOffset > startOffset;
        });

        const textUntilCode = leavesUntilCode.map(l => l.text).join("");
        const codeLeaf = leavesUntilCode.reverse().first();

        if (!codeLeaf) return next();
        if (startOffset !== textUntilCode.length) return next();

        return editor.removeMarkByKey(
          textNode.key,
          startOffset - codeLeaf.text.length,
          startOffset,
          "code"
        );
      }
    }
    return next();
  }

  return { onKeyDown };
}
