import { Editor } from "slate";
import { isMod } from "../helper/keyboard-event";

export default function KeyboardShortcuts() {
  function onKeyDown(
    ev: React.KeyboardEvent<any>,
    editor: Editor,
    next: Function
  ) {
    if (!isMod(ev)) return next();

    switch (ev.key) {
      case "b":
        ev.preventDefault();
        return toggleMark(editor, "bold", next);
      case "i":
        ev.preventDefault();
        return toggleMark(editor, "italic", next);
      case "u":
        ev.preventDefault();
        return toggleMark(editor, "underlined", next);
      case "d":
        ev.preventDefault();
        return toggleMark(editor, "deleted", next);
      default:
        return next();
    }
  }

  function toggleMark(editor: Editor, type: string, next: Function) {
    const { value } = editor;

    // don't allow formatting of main document title
    if (value.startBlock.type === "heading1") return next();

    editor.removeMark("code").toggleMark(type);
  }

  return { onKeyDown };
}
