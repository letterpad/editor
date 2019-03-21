import { isMod } from "../../helper/keyboard-event";
import { EditorEventHandler } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { forceClickUploadButton } from "../image/ImageUtils";

const ImageKeyboardShortcut: EditorEventHandler = (event, editor) => {
  if (
    isKeyboardEvent(event) &&
    isMod(event) &&
    event.shiftKey &&
    event.key === "i"
  ) {
    return forceClickUploadButton(editor);
  }
  return;
};

export default ImageKeyboardShortcut;
