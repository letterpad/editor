import "prismjs/components/prism-markup-templating";

import { letterpadClassName, letterpadId } from "./helper/constants";

import { Editor } from "slate";
import MarkownIt from "markdown-it";
import { getRenderer } from "./plugins/Embeds";
import p from "markdown-it-prism";

const mdToHtml = MarkownIt().use(p);

const regex = /<p><a[^>]+href=\"(.*?)\"[^>]*>(.*?)<\/a><\/p>/gi;

export function getHtmlFromMarkdown(markdown: string, editor?: Editor) {
  const html = mdToHtml.render(markdown);
  const htmlWithEmbedContent = convertLinksToEmbed(html, editor);
  const htmlWithImageCaptions = addImageCaptionsFromAlt(htmlWithEmbedContent);
  return `<div class='${letterpadClassName}' id='${letterpadId}'>${htmlWithImageCaptions}</div>`;
}

export default function convertLinksToEmbed(html: string, editor?: Editor) {
  const htmlWithEmbedContent = replace(html, regex, (match, url: string) => {
    const embedContent = getEmbedHtml(match, url, editor);
    return embedContent;
  });

  return htmlWithEmbedContent;
}

function addImageCaptionsFromAlt(html: string) {
  const htmlWithCaptions = html.replace(
    /<img[^>]* alt=\"([^\"]*)\"[^>]*>/g,
    (image, alt) => {
      const caption = alt ? `<figcaption>${alt}</figcaption>` : "";
      return `<figure>${image}${caption}</figure>`;
    }
  );

  return htmlWithCaptions;
}

function replace(str, regex, replacer) {
  const matches = [];
  str.replace(regex, (match, ...args) => {
    //@ts-ignore
    matches.push(replacer(match, ...args));
  });
  return str.replace(regex, () => matches.shift());
}

function getEmbedHtml(anchorTag: string, url: string, editor?: Editor) {
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
    getComponent: editor ? editor.props.getLinkComponent : null
  });
  if (!renderHandle) return anchorTag;
  const iframeAttributes = renderHandle.iframeAttributes;
  let attrs = "";
  Object.keys(iframeAttributes).forEach(key => {
    attrs += `${key}="${iframeAttributes[key]}" `;
  });
  return `<iframe ${attrs}></iframe>`;
}
