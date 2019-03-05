import {
  unindentClosingBlocks,
  handleSelectAll,
  getTextAtCurrentLine,
  getAnchorOffsetAtCurrentLine
} from "./CodeblockUtils";
import { isMod } from "../../helper/keyboard-event";
import { Editor } from "slate";
import { isKeyboardEvent } from "../../helper/events";
import { isPrintableKeycode, getCodeBlockParent } from "../../helper/util";

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
      const textAtCurrentLine = getTextAtCurrentLine(value);
      let nSpaces = textAtCurrentLine.search(/\S|$/);
      // react the last char of this line
      const lastChar = textAtCurrentLine.charAt(textAtCurrentLine.length - 1);
      if (["{", "[", "length("].indexOf(lastChar) >= 0) {
        return editor.insertText("\n" + " ".repeat(2 + nSpaces));
      }
      if (nSpaces === 0) {
        return editor.insertText("\n");
      }
      return editor.insertText("\n" + " ".repeat(nSpaces));

    case "Tab":
      event.preventDefault();
      if (event.shiftKey) {
        // check if there is space available to deindent
        const textAtCurrentLine = getTextAtCurrentLine(value);
        const anchorOffsetAtCurrentLine = getAnchorOffsetAtCurrentLine(value);
        let nSpaces = textAtCurrentLine.search(/\S|$/);
        let indentSpace = 2;
        if (nSpaces >= indentSpace) {
          const offset = window.getSelection().anchorOffset;
          return editor
            .moveTo(offset - anchorOffsetAtCurrentLine + indentSpace)
            .deleteBackward(indentSpace)
            .moveTo(offset - indentSpace);
        }
      } else {
        // insert 2 spaces
        editor.insertText("  ");
      }
      return next();

    case "a":
      return handleSelectAll(event, editor);

    case "}":
    case ")":
    case "]":
      return unindentClosingBlocks(editor);

    default:
      return next();
  }
};

export default codeblockKeyboardShortcut;
