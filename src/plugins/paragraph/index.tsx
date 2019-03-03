import React from "react";
import { PluginConfig } from "..";

const identifier = ["p"];

const paragraphConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    identifier,
    render: (props: any) => <p {...props} />
  }
];

export default paragraphConfig;
