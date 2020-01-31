import * as React from "react";

import { Editor, Node } from "slate";
import { IEmbedProvider, TypeIframeProps } from "../types";

import DefaultEmbed from "../components/EmbedProviders/DefaultEmbed";
import { getEmbedProvider } from "../components/EmbedProviders";

type Options = {
  getComponent?: (
    node: Node,
    props: TypeIframeProps
  ) => React.ComponentType<any> | void;
};

function findTopParent(document, node): Node {
  let parent;
  while (node !== document) {
    parent = document.getParent(node.key);
    if (parent === document) return node;
    node = parent;
  }
}

export default function Embeds({ getComponent }: Options) {
  if (!getComponent) {
    getComponent = () => DefaultEmbed;
  }

  return {
    normalizeNode(node: Node, editor: Editor, next: Function) {
      if (
        !getComponent ||
        node.type === "block" ||
        node.type !== "link" ||
        node.text !== node.data.get("href")
      )
        return next();

      const href = node.data.get("href");
      // check if the editor can embed this link
      const provider = getEmbedProvider(href);
      if (!provider) return next();
      const { component, matches } = provider;

      const EmbedComponent: React.ComponentType<IEmbedProvider> & {
        getEmbedAttributes?: any;
      } = component;

      const iframeAttributes = EmbedComponent.getEmbedAttributes(
        node.data.get("href")
      );

      // check if the consumer want to tackle this link
      const ConsumerEmbedComponent = getComponent(node, iframeAttributes);

      const renderer = ConsumerEmbedComponent || EmbedComponent;
      if (!renderer) return next();

      const parent = findTopParent(editor.value.document, node);
      if (!parent) return next();

      if (parent.type !== "paragraph" || parent.text !== node.text)
        return next();

      return (editor: Editor) => {
        return editor.replaceNodeByKey(parent.key, {
          object: "block",
          type: "link",
          isVoid: true,
          nodes: [
            {
              object: "text",
              leaves: [{ text: "" }]
            }
          ],
          data: {
            ...node.data.toJS(),
            embed: true,
            component: renderer
          }
        });
      };
    }
  };
}
