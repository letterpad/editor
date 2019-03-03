import React from "react";
import EmbedNode from "./EmbedNode";
import EmbedButton from "./EmbedButton";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { hasBlock } from "../../helper/strategy";
import { parseUrl, insertEmbed } from "./EmbedUtils";

const TAGNAME = "iframe";

export const EmbedPlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (event.key === "Enter") {
          const isActive = hasBlock(editor.value, TAGNAME);
          if (isActive) {
            event.preventDefault();
            return editor.splitBlock(1).setBlocks("p");
          }
        }
      }
      return next();
    }
  };
};

const EmbedConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: EmbedButton }],
    render: EmbedNode,
    identifier: [TAGNAME],
    slatePlugin: EmbedPlugin,
    markdown: {
      trigger: "]",
      before: /(\[embed=?.*)/,
      change: (editor, _, matches) => {
        const src = matches.before[0].replace("[embed=", "");
        const parsedSrc = parseUrl(src);
        if (parsedSrc) {
          return insertEmbed(editor, TAGNAME, parsedSrc);
        }
        return editor.focus();
      }
    },
    rules: {
      serialize: (obj, children) => {
        if (obj.object !== "block") {
          return;
        }
        const props = { children, node: obj, attributes: {} };
        if (obj.type === TAGNAME) {
          return <EmbedNode {...props} />;
        }
      },
      deserialize: (el, next) => {
        const type = el.tagName.toLowerCase();
        if (type === TAGNAME) {
          return {
            object: "block",
            type: type,
            data: {
              className: el.getAttribute("class"),
              src: el.getAttribute("src") || null
            },
            nodes: next(el.childNodes)
          };
        }
      }
    }
  }
];

export default EmbedConfig;
