import BlockquoteButton from "./BlockquoteButton";
import BlockquoteNode from "./BlockquoteNode";
import { BlockquotePlugin } from "./slatePlugin";
import { PluginConfig } from "..";

const blockquotePluginConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [
      {
        button: BlockquoteButton
      }
    ],
    toolbarButtons: [],
    render: BlockquoteNode,
    identifier: ["blockquote"],
    slatePlugin: BlockquotePlugin,
    markdown: {
      trigger: "space",
      before: /^(>)$/,
      change: editor => editor.setBlocks("blockquote")
    }
  }
];

export default blockquotePluginConfig;
