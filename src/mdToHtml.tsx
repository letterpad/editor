import embeds, { getEmbedProvider } from "./components/EmbedProviders";

import MarkownIt from "markdown-it";
import { getRenderer } from "./plugins/Embeds";

const mdToHtml = MarkownIt();

const regex = /<p><a[^>]+href=\"(.*?)\"[^>]*>(.*?)<\/a><\/p>/gi;

export function getHtmlFromMarkdown(markdown: string, editor) {
  const html = mdToHtml.render(markdown);
  const htmlWithEmbedContent = convertLinksToEmbed(html, editor);
  return htmlWithEmbedContent;
}

export default function convertLinksToEmbed(html: string, editor) {
  const htmlWithEmbedContent = replace(html, regex, (match, url: string) => {
    const embedContent = getEmbedHtml(match, url, editor);
    return embedContent;
  });

  return htmlWithEmbedContent;
}

function replace(str, regex, replacer) {
  const matches = [];
  str.replace(regex, (match, ...args) => {
    matches.push(replacer(match, ...args));
  });
  return str.replace(regex, () => matches.shift());
}

function getEmbedHtml(anchorTag: string, url: string, editor) {
  const keys = Object.keys(embeds);
  const node = {
    data: {
      get: attr => {
        if (attr === "text" || attr == "href") {
          return url;
        }
      }
    }
  };
  const renderHandle = getRenderer({
    node,
    href: url,
    getComponent: editor.props.getLinkComponent
  });
  if (!renderHandle) return anchorTag;
  const iframeAttributes = renderHandle.iframeAttributes;
  let attrs = "";
  Object.keys(iframeAttributes).forEach(key => {
    attrs += `${key}="${iframeAttributes[key]}" `;
  });
  return `<iframe ${attrs}></iframe>`;
}
