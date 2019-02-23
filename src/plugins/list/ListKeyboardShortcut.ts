import { onTab, onBackspace, onEnter } from "./ListUtils";
import { Editor } from "slate";

const ListKeyboardShortcut = (
  event: Event,
  editor: Editor,
  next: () => any
) => {
  switch (event.key) {
    case "Tab":
      return onTab(event, editor);
    case "Backspace":
      return onBackspace(event, editor, next);
    case "Enter": {
      return onEnter(event, editor, next);
    }
  }

  next();
};

export default ListKeyboardShortcut;
