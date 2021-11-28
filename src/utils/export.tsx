import { getEmbedType, Iframe } from "@plugins/embed";
import { EditorBlockTypes } from "@src/_types";
import { convertToHTML } from "draft-convert";
import Prism from "prismjs";
import React from "react";

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

    if (type === EditorBlockTypes.Placeholder) {
      return <br />;
    }

    if (type === EditorBlockTypes.Embed) {
      if (!block.data?.src) return <p />;
      return (
        <Iframe
          type={getEmbedType(block.data.src).type}
          src={block.data.src}
          className=""
        />
      );
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
    if (entity.type === EditorBlockTypes.Embed) {
      const { src } = getEmbedType(entity.data.src);

      return src ? (
        <div className="lp-iframe-wrapper">
          <iframe src={src} className="iframe" />
        </div>
      ) : (
        <br />
      );
    }
    return originalText;
  },
});
