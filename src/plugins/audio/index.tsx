import React from "react";
import { AutoReplaceParams } from "slate-auto-replace";
import AudioButton from "./AudioButton";
import { PluginConfig } from "..";
import AudioNode from "./AudioNode";
import { isKeyboardEvent } from "../../helper/events";
import { hasBlock } from "../../helper/strategy";

const TAGNAME = "audio";

const AudioPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    const type = "audio";
    if (isKeyboardEvent(event) && event.key === "Enter") {
      const isActive = hasBlock(editor.value, type);
      if (isActive) {
        event.preventDefault();
        return editor.splitBlock(1).setBlocks("paragraph");
      }
    }
    return next();
  }
});

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const src = matched.before[0].replace("[audio=", "");
  return editor
    .setBlocks({ type: "audio", data: { src: src } })
    .moveToEndOfBlock()
    .insertBlock("paragraph");
};

const audioConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: AudioButton }],
    render: AudioNode,
    identifier: [TAGNAME],
    slatePlugin: AudioPlugin,
    markdown: {
      trigger: "]",
      before: /(\[audio=?.*)/,
      change: onChange
    },
    rules: {
      serialize: (obj, children) => {
        if (obj.object === "block" && obj.type === TAGNAME) {
          const props = { children, node: obj, attributes: {} };
          return <AudioNode {...props} />;
        }
      },
      deserialize: (el, next) => {
        const type = el.tagName.toLowerCase();
        if (type === TAGNAME) {
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

export default audioConfig;
