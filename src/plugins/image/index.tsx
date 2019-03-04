import React from "react";
import ImageButton from "./ImageButton";
import { PluginConfig } from "..";
import ImageNode from "./ImageNode";

const ImagePlugin: PluginConfig["slatePlugin"] = () => ({});

const imageConfig: PluginConfig[] = [
  {
    type: "inline",
    tag: "node",
    toolbarButtons: [
      {
        button: ImageButton
      }
    ],
    render: ImageNode,
    identifier: ["img"],
    slatePlugin: ImagePlugin,
    rules: {
      deserialize: (el, next) => {
        if (el.tagName !== "IMG") return;

        // return {
        //   object: "inline",
        //   type: "img",
        //   data: {
        //     align: "wide",
        //     title: "https://unsplash.com/photos/l3N9Q27zULw",
        //     src:
        //       "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
        //   }
        // };

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
