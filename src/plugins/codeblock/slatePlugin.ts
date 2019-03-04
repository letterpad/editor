import CodeblockKeyboardShortcut from "./CodeblockKeyboardShortcut";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
const CodeblockPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(...args) {
    return CodeblockKeyboardShortcut(...args);
  },
  onPaste(e) {
    console.log("e :", e);
  }
});

export { CodeblockPlugin };
