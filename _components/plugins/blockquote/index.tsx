import React from "react";

import BlockquoteButton from "./BlockquoteButton";
import BlockquoteNode from "./BlockquoteNode";
import { PluginConfig } from "..";

import { isKeyboardEvent } from "../../helper/events";
import { isMod } from "../../helper/keyboard-event";
import { hasBlock } from "../../helper/strategy";
import { applyBlockquote } from "./BlockquoteUtils";
import { nodeTypes } from "../../helper/util";

const TAGNAME = "blockquote";

const BlockquotePlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    const type = "blockquote";
    if (!isKeyboardEvent(event)) return;
    if (isMod(event) && event.key === "/") {
      const isActive = hasBlock((editor as any).value, type);
      return applyBlockquote(editor, isActive ? "p" : type);
    } else if (event.key === "Enter") {
      const isActive = hasBlock((editor as any).value, type);
      if (isActive) {
        event.preventDefault();
        return editor.splitBlock(1).setBlocks("p");
      }
    }
    return next();
  }
});

const blockquotePluginConfig: PluginConfig[] = [
  {
    name: "plugin-blockquote",
    renderType: "node",
    menuButtons: [
      {
        button: BlockquoteButton
      }
    ],
    toolbarButtons: [],
    render: BlockquoteNode,
    identifier: [TAGNAME],
    slatePlugin: BlockquotePlugin,
    markdown: {
      trigger: "space",
      before: /^(>)$/,
      change: editor => editor.setBlocks(TAGNAME)
    },
    rules: {
      serialize: (obj, children) => {
        if (obj.object === nodeTypes.BLOCK && obj.type === TAGNAME) {
          const props = { children, node: obj, attributes: {} };
          return <BlockquoteNode {...props} />;
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

export default blockquotePluginConfig;
