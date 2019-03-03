import React from "react";
import { PluginConfig } from "..";

const identifier = ["p"];

const paragraphConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    identifier,
    render: ({ children, attributes }: any) => (
      <p {...attributes}>{children}</p>
    ),
    rules: {
      serialize(obj: any, children: any) {
        if (obj.object === "block" && obj.type === "p") {
          return <p>{children}</p>;
        }
      },
      deserialize(el, next) {
        const type = el.tagName.toLowerCase();
        if (type === "p") {
          return {
            object: "block",
            type: type,
            nodes: next(el.childNodes)
          };
        }
      }
    }
  }
];

export default paragraphConfig;
