import React from "react";
import { PluginConfig } from "..";

const identifier = ["p"];

const paragraphConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    identifier,
    render: ({ children, attributes }: any) => <p {...attributes}>{children}</p>
  }
];

export default paragraphConfig;
