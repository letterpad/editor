import React from "react";
import ImageButton from "./ImageButton";
import { PluginConfig } from "..";
import ImageNode from "./ImageNode";
import { Figure } from "./ImageNode.css";

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
              src: el.getAttribute("src"),
              height: el.getAttribute("height"),
              width: el.getAttribute("width"),
              type: el.getAttribute("type")
            }
          };
        } else if (el.tagName === "FIGURE") {
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
        const props = { children, node: obj, attributes: {} };
        if (obj.type === "figure") {
          const { node, ...rest } = props;
          // also pass the image attributes
          const imgAttrs =
            node.nodes.size > 1 ? node.nodes.get(1).data.toObject() : {};

          // if(imgAttrs.width && imgAttrs.width.indexOf("%") > 0) {
          // imgAttrs.width = 300;
          // }
          console.log(imgAttrs);
          return (
            <Figure {...rest} data-id="plugin-image-figure" {...imgAttrs} />
          );
        }
        if (obj.object != "inline") {
          return;
        }
        console.log("props :", props);
        return <ImageNode {...props} />;
      }
    }
  }
];

export default imageConfig;
