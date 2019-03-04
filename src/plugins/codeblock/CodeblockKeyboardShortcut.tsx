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
      if (event.shiftKey) {
        // check if there is space available to deindent
        const allowed = true; //editor.value.anchorText.text.startsWith("  ");
        if (allowed) {
          getIndexLastCharOfLine();
          // editor.moveFocusToStartOfInline();
          // editor.moveStartToStartOfText();
          // .deleteForward(2)
          // .moveToEndOfInline();
        }
      } else {
        // insert 2 spaces
        editor.insertText("  ");
      }
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

function getIndexLastCharOfLine() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const caretIndex = range.startOffset;
  const rect = range.getBoundingClientRect();
  const container = range.startContainer;
  const lastIndex = (container as any).length;

  for (let i = caretIndex; i < lastIndex; i++) {
    const rangeTest = document.createRange();
    rangeTest.setStart(container, i);
    const rectTest = rangeTest.getBoundingClientRect();
    console.log("rect, rectText :", rect, rectTest);
    // if the y is different it means the test range is in a different line
    //if (rectTest.y !== rect.y) return i - 1;
  }

  return lastIndex;
}
