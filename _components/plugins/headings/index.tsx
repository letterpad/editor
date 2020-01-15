import React from "react";
import HeadingsButton from "./HeadingsButton";
import HeadingsNode from "./HeadingsNode";
import { HeadingsPlugin } from "./slatePlugin";
import { PluginConfig } from "..";
import { nodeTypes } from "../../helper/util";

const identifier = ["h1", "h2", "h3", "h4", "h5", "h6"];

const headingsConfig: PluginConfig[] = [
  {
    renderType: "node",
    menuButtons: [
      { button: HeadingsButton, props: { type: "h2" } },
      { button: HeadingsButton, props: { type: "h3" } }
    ],
    toolbarButtons: [{ button: HeadingsButton, props: { type: "h1" } }],
    render: HeadingsNode,
    identifier,
    slatePlugin: HeadingsPlugin,
    markdown: {
      trigger: "space",
      before: /^(#{1,5})$/,
      change: (editor, _, matches) => {
        const hashes = matches.before.input;
        return editor.setBlocks({ type: "h" + hashes.length });
      }
    },
    rules: {
      serialize: (obj, children) => {
        if (
          obj.object === nodeTypes.BLOCK &&
          identifier.indexOf(obj.type) >= 0
        ) {
          const props = { children, node: obj, attributes: {} };
          return <HeadingsNode {...props} />;
        }
      },
      deserialize: (el, next) => {
        const type = el.tagName.toLowerCase();
        if (identifier.indexOf(type) >= 0) {
          return {
            object: nodeTypes.BLOCK,
            type: type,
            data: {
              style: el.getAttribute("style")
            },
            nodes: next(el.childNodes)
          };
        }
      }
    }
  }
];

export default headingsConfig;
