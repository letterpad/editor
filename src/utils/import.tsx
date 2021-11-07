import { EditorBlockTypes } from "@src/types";
import { convertFromHTML } from "draft-convert";

export const importData = convertFromHTML({
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === "a") {
      return createEntity("LINK", "MUTABLE", { url: node.href });
    }
    if (nodeName === "hr") {
      return createEntity(EditorBlockTypes.Divider, "IMMUTABLE", {
        type: EditorBlockTypes.Divider,
      });
    }
    if (nodeName === "iframe") {
      return createEntity(EditorBlockTypes.Embed, "IMMUTABLE", {
        type: EditorBlockTypes.Embed,
        src: node.src,
      });
    }
  },
  htmlToBlock: (nodeName, node) => {
    if (nodeName === "iframe") {
      return {
        type: EditorBlockTypes.Atomic,
        data: {
          type: EditorBlockTypes.Embed,
          src: node.src,
        },
      };
    }
    if (nodeName === "hr") {
      return {
        type: EditorBlockTypes.Atomic,
        data: { type: EditorBlockTypes.Divider },
      };
    }
    if (nodeName === "img") {
      return {
        type: EditorBlockTypes.Atomic,
        data: {
          src: node.src,
          type: EditorBlockTypes.Image,
          caption: node.alt,
        },
      };
    }
    if (nodeName === "figure") {
      if (!node.children.length) {
        return undefined;
      }

      let caption = "",
        src = "";
      const blockType = EditorBlockTypes.Image;
      const captionNode = node.children[1];
      if (captionNode !== undefined) {
        caption = captionNode.innerHTML;
      }
      const blockNode = node.children[0];
      if (blockNode !== undefined) {
        src = blockNode["src"];
      }

      return {
        type: EditorBlockTypes.Atomic,
        data: { src, type: blockType, caption },
      };
    }
  },
});
