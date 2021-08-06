
import {convertToHTML} from "draft-convert";
import Prism from "prismjs";

export const exportData = convertToHTML({
  blockToHTML: (block) => {
    const type = block.type;

    if (type === 'IMAGE') {
      return <p />;
    }
    if (type === 'atomic' || type === 'IMAGE') {
      let url = block?.data?.src
      return {start: "<figure><img src='" + (url) + "'", end: "</img><figcaption>" + block.data?.caption + "</figcaption></figure>"}
    }
    if (type === 'code-block') {
      return `<pre><pre>${Prism.highlight(block.text, Prism.languages.javascript, 'javascript')}</pre></pre>`;
    }

    if (type === 'unstyled') {
      return <p />
    }

  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === 'LINK') {
      return <a href={entity.data?.url} title={entity.data?.url} />
    }
    if (entity.type === 'IMAGE') {
      console.log("image found");
    }
    return originalText;
  }


})

