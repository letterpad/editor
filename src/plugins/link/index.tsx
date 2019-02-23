import LinkNode from "./LinkNode";
import LinkKeyboardShortcut from "./LinkKeyboardShortcut";
import * as LinkUtils from "./LinkUtils";
import LinkButton from "./LinkButton";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
const LinkPlugin: PluginConfig["main"] = () => ({
  onKeyDown(...args) {
    return LinkKeyboardShortcut(...args);
  }
});

export { LinkPlugin, LinkNode, LinkKeyboardShortcut, LinkUtils, LinkButton };
