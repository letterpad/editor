import MarkdownKeyboardShortcut from "./MarkdownKeyboardShortcut";
import * as MarkdownUtils from "./MarkdownUtils";

/* eslint-disable no-unused-vars */
const MarkdownPlugin = options => ({
  onKeyDown(event, editor, next) {
    return next();
    // return MarkdownKeyboardShortcut(...args);
  }
});

export { MarkdownPlugin, MarkdownKeyboardShortcut, MarkdownUtils };
