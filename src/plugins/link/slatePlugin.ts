import LinkKeyboardShortcut from "./LinkKeyboardShortcut";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
const LinkPlugin: PluginConfig["main"] = () => ({
  onKeyDown(...args) {
    return LinkKeyboardShortcut(...args);
  }
});

export { LinkPlugin };
