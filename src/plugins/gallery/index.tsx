import React from "react";
import GalleryButton from "./GalleryButton";
import { PluginConfig } from "..";
import GalleryNode from "./GalleryNode";

const GalleryPlugin: PluginConfig["slatePlugin"] = () => ({});

const GalleryConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    toolbarButtons: [
      {
        button: GalleryButton
      }
    ],
    render: GalleryNode,
    identifier: ["section", "figure"],
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
