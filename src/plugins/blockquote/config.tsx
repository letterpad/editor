import BlockquoteButton from "./BlockquoteButton";
import BlockquoteNode from "./BlockquoteNode";
import { BlockquotePlugin } from ".";
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
    main: BlockquotePlugin,
    markdown: {
      trigger: "space",
      before: /^(>)$/,
      change: editor => editor.setBlocks("blockquote")
    }
  }
];

export default blockquotePluginConfig;
