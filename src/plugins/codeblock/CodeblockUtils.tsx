import Prism from "prismjs";
import { Block, Range, Editor, Point, Node, Text } from "slate";
import { isMod } from "../../helper/keyboard-event";
import { getCodeBlockParent, getAllDecorations } from "../../helper/util";
import { Plugin } from "slate-react";

export const applyCodeblock = (editor: Editor) => {
  const { value } = editor;
  const codeBlock = getCodeBlockParent(value, "pre");

  if (codeBlock) {
    const firstNode = codeBlock.nodes.get(0);
    if (isTextNode(firstNode)) return;
    const lastNode = codeBlock.nodes.get(codeBlock.nodes.size - 1);
    if (isTextNode(lastNode)) return;

    const startNode = firstNode.nodes.get(0);
    const endNode = lastNode.nodes.get(0);

    editor.select(
      Range.create({
        anchor: Point.create({
          key: startNode.key,
          path: 1,
          offset: 0
        }),
        focus: Point.create({
          key: endNode.key,
          path: 2,
          offset: codeBlock.text.length
        })
      })
    );

    return editor
      .removeMark("highlight")
      .unwrapBlockByKey(codeBlock.key, "pre")
      .focus();
  }

  return editor.wrapBlock("pre");
};

export function isTextNode(node: Node): node is Text {
  if (Object.prototype.hasOwnProperty.call(node, "nodes")) {
    return true;
  }
  return false;
}

export const decorateNode: Plugin["decorateNode"] = (
  document,
  editor,
  next
) => {
  const others: any[] = next() || [];
  if (isTextNode(document)) return others;
  const node = editor.value.anchorBlock;
  const { type } = node;
  if (type != "pre") return others;

  const language = node.data.get("language");

  const texts = node.getTexts().toArray();
  const string = texts.map(t => t.text).join("\n");
  const grammar = Prism.languages[language];

  const tokens = Prism.tokenize(string, grammar);

  const decorations = getAllDecorations(tokens, texts);

  return [...others, ...decorations];
};

export const insertNewLineBeforeCodeBlock = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);

  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;

  if (codeBlock.type !== "pre") return;

  // is it the first element in codeblock
  if (codeBlock.nodes.findIndex(node => node === anchor) !== 0) return;

  const parentContainer = change.value.document.getParent(codeBlock.key);
  if (parentContainer == null) return;
  if (isTextNode(parentContainer)) return;
  const index = parentContainer.nodes.findIndex(node => node === codeBlock);

  change.insertNodeByKey(
    parentContainer.key,
    index,
    Block.create({
      type: "p"
    })
  );

  return true;
};

export const deleteNewLineBeforeCodeBlock = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);

  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;
  if (codeBlock.type !== "pre") return;

  // is it the first element in codeblock
  if (codeBlock.nodes.findIndex(node => node === anchor) !== 0) return;

  const parentContainer = change.value.document.getParent(codeBlock.key);
  if (parentContainer == null) return;
  if (isTextNode(parentContainer)) return;
  const index = parentContainer.nodes.findIndex(node => node === codeBlock);

  if (index === 0) {
    return applyCodeblock(change);

    // const targetNode = parentContainer.nodes.get(index);
    // change.removeNodeByKey(targetNode.key);
    // return true;
  }
};

export const preserveIndentationForCodeBlock = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = getCodeBlockParent(change.value, "pre");

  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;
  if (codeBlock.type !== "pre") return;

  const lines = anchor.text.split(/\r?\n/);
  const lastLine = lines[lines.length - 1];
  let nSpaces = lastLine.search(/\S|$/);

  if (
    lastLine.trim().endsWith("{") ||
    lastLine.trim().endsWith("(") ||
    lastLine.trim().endsWith("[")
  ) {
    nSpaces += 2;
  }

  change.insertText("\n" + " ".repeat(nSpaces));

  return true;
};

export const unindentClosingBlocks = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);
  if (codeBlock != null && !isTextNode(codeBlock) && codeBlock.type !== "pre") {
    return;
  }

  const lines = anchor.text.split(/\r?\n/);
  const lastLine = lines[lines.length - 1];

  const nSpaces = lastLine.search(/\S|$/);
  if (nSpaces === lastLine.length) {
    change.deleteBackward(2);
    return true;
  }
};

export const handleCommandAInCodeBlock = (event: Event, change: Editor) => {
  if (!isMod(event)) return;

  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);
  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;
  if (codeBlock.type !== "pre") {
    return;
  }

  const firstNode = codeBlock.nodes.get(0);
  if (isTextNode(firstNode)) return;
  const lastNode = codeBlock.nodes.get(codeBlock.nodes.size - 1);
  if (isTextNode(lastNode)) return;

  const startNode = firstNode.nodes.get(0);
  const endNode = lastNode.nodes.get(0);

  change.select(
    Range.create({
      anchor: startNode as any,
      focus: endNode as any
      // mark: { type: "pre" }
      // anchorKey: startNode.key,
      // anchorOffset: 0,
      // focusKey: lastNode.key,
      // focusOffset: codeBlock.text.length
    })
  );

  change.moveToRangeOf(codeBlock);
  change.focus();

  event.preventDefault();
  return true;
};
