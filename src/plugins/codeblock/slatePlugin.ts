import CodeblockKeyboardShortcut from "./CodeblockKeyboardShortcut";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
const CodeblockPlugin: PluginConfig["main"] = () => ({
  onKeyDown(...args) {
    return CodeblockKeyboardShortcut(...args);
  }
});

export { CodeblockPlugin };
