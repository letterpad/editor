import YoutubeButton from "./YoutubeButton";
import YoutubeNode from "./YoutubeNode";
import { YoutubePlugin } from ".";
import { Editor } from "slate";

export default [
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
      change: (editor: Editor, event, matches) => {
        const src = matches.before[0].replace("[youtube=", "");
        return editor
          .setBlocks({ type: "iframe", data: { src: src } })
          .moveToEndOfBlock()
          .insertBlock("paragraph");
      }
    }
  }
];
