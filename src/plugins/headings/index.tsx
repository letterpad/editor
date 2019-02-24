import React from "react";
import HeadingsButton from "./HeadingsButton";
import HeadingsNode from "./HeadingsNode";
import { HeadingsPlugin } from "./slatePlugin";
import { PluginConfig } from "..";

const identifier = ["h1", "h2", "h3", "h4", "h5", "h6"];

const headingsConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [
      { button: HeadingsButton, props: { type: "h1" } },
      { button: HeadingsButton, props: { type: "h2" } }
    ],
    toolbarButtons: [
      { button: HeadingsButton, props: { type: "h3" } },
      { button: HeadingsButton, props: { type: "h4" } },
      { button: HeadingsButton, props: { type: "h5" } }
    ],
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
        if (obj.object === "block" && identifier.indexOf(obj.type) >= 0) {
          const props = { children, node: obj, attributes: {} };
          return <HeadingsNode {...props} />;
        }
      },
      deserialize: (el, next) => {
        const type = el.tagName.toLowerCase();
        if (identifier.indexOf(type) >= 0) {
          return {
            object: "block",
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
