import React from "react";
import { PluginConfig } from "..";
import { nodeTypes } from "../../helper/util";

const identifier = ["p"];

const paragraphConfig: PluginConfig[] = [
  {
    renderType: "node",
    identifier,
    render: ({ children, attributes }: any) => (
      <section {...attributes} data-id="plugin-paragraph">
        {children}
      </section>
    ),
    rules: {
      serialize(obj: any, children: any) {
        if (
          obj.type === "section" ||
          obj.type === "div" ||
          obj.type === "p" ||
          obj.type === "paragraph"
        ) {
          return <section>{children}</section>;
        }
      },
      deserialize(el, next) {
        const type = el.tagName.toLowerCase();
        if (type === "section" || type === "div") {
          return {
            object: nodeTypes.BLOCK,
            type: type,
            nodes: next(el.childNodes)
          };
        }
      }
    }
  }
];

export default paragraphConfig;
