import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { MARK_TAGS } from "../../helper/constants";
import { Editor } from "slate";

/* eslint-disable no-unused-vars */
export const UnderlinePlugin = options => {
  return {
    onKeyDown(event: KeyboardEvent, editor: Editor, next: () => {}) {
      if (!isMod(event) || event.key != "u") return next();
      event.preventDefault();
      applyMarkStrategy(editor, MARK_TAGS.u);
    }
  };
};
