import { Editor } from "slate";
import isHotkey from "is-hotkey";

const Keymap = shortcuts => {
  const functions = Object.keys(shortcuts).map(key => {
    const isKeyPressed = isHotkey(key);
    const command = shortcuts[key];

    const check = event => isKeyPressed(event);

    const handler =
      typeof command == "string"
        ? (event, editor) => {
            event.preventDefault();
            editor.command(command);
          }
        : command;

    return {
      check,
      handler
    };
  });

  return {
    onKeyDown(event: KeyboardEvent, editor: Editor, next) {
      const shortcut = functions.find(shortcut => shortcut.check(event));
      if (shortcut) {
        return shortcut.handler(event, editor, next);
      } else {
        return next();
      }
    }
  };
};

export default Keymap;
