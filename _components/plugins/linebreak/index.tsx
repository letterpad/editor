import React from "react";
import LinebreakNode from "./LinebreakNode";
import { PluginConfig } from "..";
import LinebreakButton from "./LinebreakButton";
import { nodeTypes } from "../../helper/util";

const TAGNAME = "hr";

const LinebreakPlugin = () => {
  return {};
};

const linebreakConfig: PluginConfig[] = [
  {
    renderType: "node",
    menuButtons: [],
    toolbarButtons: [{ button: LinebreakButton }],
    render: LinebreakNode,
    identifier: [TAGNAME],
    slatePlugin: LinebreakPlugin,
    markdown: {
      trigger: "space",
      before: /^(-{3})$/,
      change: editor => {
        return editor.setBlocks({ type: TAGNAME });
      }
    },
    rules: {
      serialize: (obj, children) => {
        if (obj.object === nodeTypes.BLOCK && obj.type === TAGNAME) {
          const props = { children, node: obj, attributes: {} };
          return <LinebreakNode {...props} />;
        }
      },
      deserialize: (el, next) => {
        const type = el.tagName.toLowerCase();
        if (type === TAGNAME) {
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

export default linebreakConfig;