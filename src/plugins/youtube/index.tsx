import React from "react";
import YoutubeNode from "./YoutubeNode";
import YoutubeButton from "./YoutubeButton";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { hasBlock } from "../../helper/strategy";

const TAGNAME = "iframe";

export const YoutubePlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        const type = "Youtube";
        if (event.key === "Enter") {
          const isActive = hasBlock(editor.value, type);
          if (isActive) {
            event.preventDefault();
            return editor.splitBlock(1).setBlocks("paragraph");
          }
        }
      }
      return next();
    }
  };
};

const youtubeConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: YoutubeButton }],
    render: YoutubeNode,
    identifier: [TAGNAME],
    slatePlugin: YoutubePlugin,
    markdown: {
      trigger: "]",
      before: /(\[youtube=?.*)/,
      change: (editor, _, matches) => {
        const src = matches.before[0].replace("[youtube=", "");
        return editor
          .setBlocks({ type: TAGNAME, data: { src: src } })
          .moveToEndOfBlock()
          .insertBlock("paragraph");
      }
    },
    rules: {
      serialize: (obj, children) => {
        if (obj.object !== "block") {
          return;
        }
        const props = { children, node: obj, attributes: {} };
        if (obj.type === TAGNAME) {
          return <YoutubeNode {...props} />;
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

export default youtubeConfig;
