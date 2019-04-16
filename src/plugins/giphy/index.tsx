import React from "react";
import ImageButton from "./GiphyButton";
import { PluginConfig } from "..";
import ImageNode from "../image/ImageNode";

const ImagePlugin: PluginConfig["slatePlugin"] = () => ({});

const imageConfig: PluginConfig[] = [
  {
    renderType: "node",
    toolbarButtons: [
      {
        button: ImageButton
      }
    ],
    render: ImageNode,
    identifier: ["img", "figure"],
    slatePlugin: ImagePlugin,
    rules: {
      deserialize: (el, next) => {
        if (el.tagName !== "IMG") return;

        return {
          object: "inline",
          type: "img",
          nodes: next(el.childNodes),
          data: {
            align: el.getAttribute("align"),
            title: el.getAttribute("title"),
            src: el.getAttribute("src"),
            width: el.getAttribute("width"),
            height: el.getAttribute("height")
          }
        };
      },
      serialize: (obj, children) => {
        if (obj.object != "inline") {
          return;
        }
        const props = { children, node: obj, attributes: {} };

        return <ImageNode {...props} />;
      }
    }
  }
];

export default imageConfig;
