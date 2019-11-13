import React from "react";
import ImageButton from "./ImageButton";
import { PluginConfig } from "..";
import ImageNode from "./ImageNode";
import { Figure } from "./ImageNode.css";
import { insertImage } from "./ImageUtils";
import { nodeTypes } from "../../helper/util";

const ImagePlugin: PluginConfig["slatePlugin"] = () => ({
  onClick(_event, _editor, next) {
    const $imgWrapper = (_event.target! as any).closest(".lp_img_wrapper");
    if (!$imgWrapper) return next();
    const { dataset, src, title } = $imgWrapper.querySelector("img");
    const key = dataset.key;
    return _editor.setNodeByKey(key, {
      type: "img",
      data: {
        src: src,
        title,
        align: (_event!.target! as any).dataset!.align
      }
    });
  }
});

const imageConfig: PluginConfig[] = [
  {
    name: "plugin-image",
    renderType: nodeTypes.INLINE,
    toolbarButtons: [
      {
        button: ImageButton
      }
    ],
    hooks: { insertImage },
    render: ImageNode,
    identifier: ["img", "figure"],
    slatePlugin: ImagePlugin,
    rules: {
      deserialize: (el, next) => {
        if (el.tagName === "IMG") {
          return {
            object: nodeTypes.INLINE,
            type: "img",
            nodes: next(el.childNodes),
            data: {
              align: (el as any).dataset.align,
              title: el.getAttribute("title"),
              src: el.getAttribute("src"),
              height: el.getAttribute("height"),
              width: el.getAttribute("width"),
              type: el.getAttribute("type")
            }
          };
        } else if (el.tagName === "FIGURE") {
          return {
            object: nodeTypes.BLOCK,
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
        const { node, ...rest } = props;
        if (obj.type === "figure") {
          // also pass the image attributes
          // const imgAttrs =
          // node.nodes.size > 1 ? node.nodes.get(1).data.toObject() : {};

          return <Figure {...rest} data-id="plugin-image-figure" />;
        }
        if (obj.object != nodeTypes.INLINE) {
          return;
        }
        return (
          <ImageNode
            {...props}
            data-align={node.data.get("align")}
            hideToolbar={true}
          />
        );
      }
    }
  }
];

export default imageConfig;
