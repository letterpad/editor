import YoutubeButton from "./YoutubeButton";
import YoutubeNode from "./YoutubeNode";
import { YoutubePlugin } from ".";
import { PluginConfig } from "..";

const youtubeConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: YoutubeButton }],
    render: YoutubeNode,
    identifier: ["iframe"],
    main: YoutubePlugin,
    markdown: {
      trigger: "]",
      before: /(\[youtube=?.*)/,
      change: (editor, _, matches) => {
        const src = matches.before[0].replace("[youtube=", "");
        return editor
          .setBlocks({ type: "iframe", data: { src: src } })
          .moveToEndOfBlock()
          .insertBlock("paragraph");
      }
    }
  }
];

export default youtubeConfig;
