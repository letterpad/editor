import React from "react";
import GalleryButton from "./GalleryButton";
import { PluginConfig } from "..";
import GalleryNode from "./GalleryNode";
import { isKeyboardEvent } from "../../helper/events";

const GalleryPlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown: (event, editor, next) => {
      if (isKeyboardEvent(event) && event.key === "Backspace") {
        const selectedImg: HTMLDivElement | null = document.querySelector(
          ".letterpad-image-active-for-delete"
        );

        if (selectedImg && selectedImg.dataset && selectedImg.dataset.key) {
          return editor.removeNodeByKey(selectedImg.dataset.key);
        }
      }
      next();
    }
  };
};

const GalleryConfig: PluginConfig[] = [
  {
    renderType: "node",
    toolbarButtons: [
      {
        button: GalleryButton
      }
    ],
    render: GalleryNode,
    identifier: ["section"],
    slatePlugin: GalleryPlugin,
    rules: {
      deserialize: (el, next) => {
        if (el.tagName === "FIGURE") {
          return {
            object: "block",
            type: "figure",
            nodes: next(el.childNodes),
            data: {
              src: el.getAttribute("src")
            }
          };
        }
      },
      serialize: (obj, children) => {
        if (obj.object != "inline") {
          return;
        }
        const props = { children, node: obj, attributes: {} };
        return <GalleryNode {...props} />;
      }
    }
  }
];

export default GalleryConfig;
