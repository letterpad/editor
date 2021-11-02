import { convertFromHTML } from "draft-convert";

export const importData = convertFromHTML({
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === "a") {
      return createEntity("LINK", "MUTABLE", { url: node.href });
    }
    if (nodeName === "hr") {
      return createEntity("divider", "IMMUTABLE", { type: "divider" });
    }
  },
  htmlToBlock: (nodeName, node) => {
    if (nodeName === "hr") {
      return {
        type: "atomic",
        data: { type: "divider" },
      };
    }
    if (nodeName === "img") {
      return {
        type: "atomic",
        data: { src: node.src, type: "IMAGE", caption: node.alt },
      };
    }
    if (nodeName === "figure") {
      if (!node.children.length) {
        return undefined;
      }

      let caption = "",
        src = "",
        blockType = "IMAGE";
      const captionNode = node.children[1];
      if (captionNode !== undefined) {
        caption = captionNode.innerHTML;
      }
      const blockNode = node.children[0];
      if (blockNode !== undefined) {
        src = blockNode["src"];
      }

      const type = blockNode.tagName.toLowerCase();
      if (type === "iframe") {
        blockType = "video";
      }

      return {
        type: "atomic",
        data: { src, type: blockType, caption },
      };
    }
  },
});
