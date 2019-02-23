import ImageNode from "./ImageNode";
import ImageKeyboardShortcut from "./ImageKeyboardShortcut";
import * as ImageUtils from "./ImageUtils";
import ImageButton from "./ImageButton";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
const ImagePlugin: PluginConfig["main"] = () => ({
  // onKeyDown(event, editor, next) {
  //     return next();
  //     return ImageKeyboardShortcut(event, editor, next);
  // }
});

export {
  ImagePlugin,
  ImageNode,
  ImageKeyboardShortcut,
  ImageUtils,
  ImageButton
};
