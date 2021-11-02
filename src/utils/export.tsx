import { convertToHTML } from "draft-convert";
import Prism from "prismjs";

export const exportData = convertToHTML({
  blockToHTML: (block) => {
    const type = block.type;
    if (type === "IMAGE") {
      return <p />;
    }
    if (block.data?.type === "divider" || block.type === "divider") {
      return <hr />;
    }
    if (type === "IMAGE" || block.data?.type === "IMAGE") {
      const src = block?.data?.src;
      const caption = block?.text;
      return (
        <figure>
          <img src={src} alt={caption} />
          <figcaption>{caption}</figcaption>
        </figure>
      );
    }

    if (type === "code-block") {
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

    if (entity.type === "divider") {
      return <hr />;
    }

    return originalText;
  },
});
