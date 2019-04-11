import React from "react";
import ImageButton from "./ImageButton";
import { PluginConfig } from "..";
import ImageNode from "./ImageNode";

const ImagePlugin: PluginConfig["slatePlugin"] = () => ({});

const imageConfig: PluginConfig[] = [
  {
    name: "plugin-image",
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
        if (el.tagName === "IMG") {
          return {
            object: "inline",
            type: "img",
            nodes: next(el.childNodes),
            data: {
              align: el.getAttribute("align"),
              title: el.getAttribute("title"),
              src: el.getAttribute("src")
            }
          };
        } else if (el.tagName === "FIGURE") {
          return {
            object: "block",
            type: "figure",
            nodes: next(el.childNodes),
            data: {
              align: el.getAttribute("align"),
              title: el.getAttribute("title"),
              src: el.getAttribute("src")
            }
          };
        }
      },
      serialize: (obj, children) => {
        const props = { children, node: obj, attributes: {} };
        if (obj.type === "figure") {
          const { node, ...rest } = props;
          return <figure {...rest} />;
        }
        if (obj.object != "inline") {
          return;
        }
        return <ImageNode {...props} />;
      }
    }
  }
];

export default imageConfig;
