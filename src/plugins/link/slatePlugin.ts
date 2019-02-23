import LinkKeyboardShortcut from "./LinkKeyboardShortcut";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
const LinkPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(...args) {
    return LinkKeyboardShortcut(...args);
  }
});

export { LinkPlugin };
