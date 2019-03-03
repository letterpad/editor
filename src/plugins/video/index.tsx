import React from "react";
import VideoNode from "./VideoNode";
import VideoButton from "./VideoButton";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { hasBlock } from "../../helper/strategy";
import { parseUrl, insertVideo } from "./VideoUtils";

const TAGNAME = "iframe";

export const VideoPlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (event.key === "Enter") {
          const isActive = hasBlock(editor.value, TAGNAME);
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

const videoConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: VideoButton }],
    render: VideoNode,
    identifier: [TAGNAME],
    slatePlugin: VideoPlugin,
    markdown: {
      trigger: "]",
      before: /(\[video=?.*)/,
      change: (editor, _, matches) => {
        const src = matches.before[0].replace("[video=", "");
        const parsedSrc = parseUrl(src);
        if (parsedSrc) {
          return insertVideo(editor, TAGNAME, parsedSrc);
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
          return <VideoNode {...props} />;
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

export default videoConfig;
