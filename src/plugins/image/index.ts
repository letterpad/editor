import { ImagePlugin } from "./slatePlugin";
import ImageButton from "./ImageButton";
import { PluginConfig } from "..";
import ImageNode from "./ImageNode";

const imageConfig: PluginConfig[] = [
  {
    type: "inline",
    tag: "node",
    toolbarButtons: [
      {
        button: ImageButton
      }
    ],
    render: ImageNode,
    identifier: ["img"],
    slatePlugin: ImagePlugin,
    markdown: {
      trigger: "space",
      before: /^(>)$/,
      change: change => change.setBlocks("blockquote")
    }
  }
];

export default imageConfig;
