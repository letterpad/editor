import { ImagePlugin, ImageNode } from ".";
import ImageButton from "./ImageButton";
import { PluginConfig } from "..";

const imageConfig: PluginConfig = {
  type: "inline",
  tag: "node",
  toolbarButtons: [
    {
      button: ImageButton
    }
  ],
  render: ImageNode,
  identifier: ["img"],
  main: ImagePlugin
  // markdown: {
  //     trigger: "space",
  //     before: /^(>)$/,
  //     change: change => change.setBlocks("blockquote")
  // }
};

export default imageConfig;
