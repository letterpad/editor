import HeadingsButton from "./HeadingsButton";
import HeadingsNode from "./HeadingsNode";
import { HeadingsPlugin } from ".";
import { PluginConfig } from "..";

const headingsConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [
      { button: HeadingsButton, props: { type: "h1" } },
      { button: HeadingsButton, props: { type: "h2" } }
    ],
    toolbarButtons: [
      { button: HeadingsButton, props: { type: "h3" } },
      { button: HeadingsButton, props: { type: "h4" } },
      { button: HeadingsButton, props: { type: "h5" } }
    ],
    render: HeadingsNode,
    identifier: ["h1", "h2", "h3", "h4", "h5", "h6"],
    main: HeadingsPlugin,
    markdown: {
      trigger: "space",
      before: /^(#{1,5})$/,
      change: (editor, _, matches) => {
        const hashes = matches.before.input;
        return editor.setBlocks({ type: "h" + hashes.length });
      }
    }
  }
];

export default headingsConfig;
