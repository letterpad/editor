import {
  insertNewLineBeforeCodeBlock,
  preserveIndentationForCodeBlock,
  unindentClosingBlocks,
  handleCommandAInCodeBlock
} from "./CodeblockUtils";
import { isMod } from "../../helper/keyboard-event";
import { Editor } from "slate";
import { isKeyboardEvent } from "../../helper/events";
import { isPrintableKeycode, getCodeBlockParent } from "../../helper/util";

/* eslint-disable react/prop-types */
const codeblockKeyboardShortcut = (
  event: Event,
  editor: Editor,
  next: () => any
) => {
  const { value } = editor;

  if (!isKeyboardEvent(event)) return;

  const which = event.which;

  if (
    value.selection.isExpanded &&
    !isMod(event) &&
    isPrintableKeycode(which)
  ) {
    editor.delete();
    return next();
  }

  if (!getCodeBlockParent(value, "pre")) return next();

  switch (event.key) {
    case "Enter":
      if ((value as any).startOffset === 0) {
        const done = insertNewLineBeforeCodeBlock(editor);
        if (done) return next();
      }
      return preserveIndentationForCodeBlock(editor);

    case "Tab":
      event.preventDefault();
      // insert 2 spaces
      editor.insertText("  ");
      return next();

    case "a":
      return handleCommandAInCodeBlock(event, editor);

    case "}":
    case ")":
    case "]":
      return unindentClosingBlocks(editor);

    default:
      return next();
  }
};

export default codeblockKeyboardShortcut;
