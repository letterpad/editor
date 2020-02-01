import embeds, { getEmbedProvider } from "./components/EmbedProviders";

import Embeds from "./plugins/Embeds";
import MarkownIt from "markdown-it";
import React from "react";
import ReactDOM from "react-dom/server";
import { getRenderer } from "./plugins/Embeds";

const mdToHtml = MarkownIt();

const regex = /<a[^>]+href=\"(.*?)\"[^>]*>(.*?)<\/a>/gi;

export async function getHtmlFromMarkdown(markdown: string, editor) {
  const html = mdToHtml.render(markdown);
  const htmlWithEmbedContent = await convertLinksToEmbed(html, editor);
  return htmlWithEmbedContent;
}

export default async function convertLinksToEmbed(html: string, editor) {
  const htmlWithEmbedContent = replaceAsync(
    html,
    regex,
    async (match, url: string) => {
      const embedContent = await getEmbedHtml(match, url, editor);
      return embedContent;
    }
  );

  return htmlWithEmbedContent;
}

async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

async function getEmbedHtml(anchorTag: string, url: string, editor) {
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
