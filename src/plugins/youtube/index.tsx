import React from "react";
import YoutubeNode from "./YoutubeNode";
import YoutubeButton from "./YoutubeButton";
import { YoutubePlugin } from "./slatePlugin";
import { PluginConfig } from "..";

const TAGNAME = "iframe";

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
