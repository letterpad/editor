import { convertFromHTML } from "draft-convert";

export const importData = convertFromHTML({
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === "a") {
      return createEntity("LINK", "MUTABLE", { url: node.href });
    }
  },
  htmlToBlock: (nodeName, node) => {
    if (nodeName === "img") {
      return {
        type: "atomic",
        data: { src: node.src, type: "IMAGE" },
      };
    }
    if (nodeName === "figure") {
      if (!node.children.length) {
        return undefined;
      }

      let caption = "",
        src = "",
        blockType = "IMAGE";
      let captionNode = node.children[1];
      if (captionNode !== undefined) {
        caption = captionNode.innerHTML;
      }
      let blockNode = node.children[0];
      if (blockNode !== undefined) {
        src = blockNode["src"];
      }

      let type = blockNode.tagName.toLowerCase();
      if (type === "iframe") {
        blockType = "video";
      }

      return {
        type: "atomic",
        data: { src: src, type: blockType, caption: caption },
      };
    }
  },
});
