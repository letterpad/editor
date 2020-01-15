// import React from "react";
import ImageButton from "./GiphyButton";
import { PluginConfig } from "..";
import ImageNode from "../image/ImageNode";

const ImagePlugin: PluginConfig["slatePlugin"] = () => ({});

const imageConfig: PluginConfig[] = [
  {
    renderType: "node",
    toolbarButtons: [
      {
        button: ImageButton
      }
    ],
    render: ImageNode,
    identifier: ["img", "figure"],
    slatePlugin: ImagePlugin,
    rules: {
      // image plugin is doing this anyways
    }
  }
];

export default imageConfig;
