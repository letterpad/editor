// import { keyboardEvent } from "@slate-editor/utils";
import { forceClickUploadButton } from "./ImageUtils";
import { isMod } from "../../helper/keyboard-event";
import { EditorEventHandler } from "..";
import { isKeyboardEvent } from "../../helper/events";

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
