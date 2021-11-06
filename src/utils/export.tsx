import { EditorBlockTypes } from "@src/types";
import { convertToHTML } from "draft-convert";
import Prism from "prismjs";

export const exportData = convertToHTML({
  blockToHTML: (block) => {
    const type = block.type;
    if (type === EditorBlockTypes.Image) {
      return <p />;
    }
    if (
      block.data?.type === EditorBlockTypes.Divider ||
      block.type === EditorBlockTypes.Divider
    ) {
      return <hr />;
    }
    if (
      type === EditorBlockTypes.Image ||
      block.data?.type === EditorBlockTypes.Image
    ) {
      const src = block?.data?.src;
      const caption = block?.text;
      return (
        <figure>
          <img src={src} alt={caption} />
          <figcaption>{caption}</figcaption>
        </figure>
      );
    }

    if (type === EditorBlockTypes.CodeBlock) {
      return `<pre>${Prism.highlight(
        block.text,
        Prism.languages.javascript,
        "javascript"
      )}</pre>`;
    }

    if (type === "unstyled") {
      return <p />;
    }
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === "LINK") {
      return <a href={entity.data?.url} title={entity.data?.url} />;
    }

    if (entity.type === EditorBlockTypes.Divider) {
      return <hr />;
    }

    return originalText;
  },
});
