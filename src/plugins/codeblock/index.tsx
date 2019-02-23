import CodeblockNode from "./CodeblockNode";
import CodeblockKeyboardShortcut from "./CodeblockKeyboardShortcut";
import * as CodeblockUtils from "./CodeblockUtils";
import CodeblockButton from "./CodeblockButton";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
const CodeblockPlugin: PluginConfig["main"] = () => ({
  onKeyDown(...args) {
    return CodeblockKeyboardShortcut(...args);
  }
});

export {
  CodeblockPlugin,
  CodeblockNode,
  CodeblockKeyboardShortcut,
  CodeblockUtils,
  CodeblockButton
};
