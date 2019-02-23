import { LinebreakButton, LinebreakPlugin } from ".";
import LinebreakNode from "./LinebreakNode";
import { PluginConfig } from "..";

const linebreakConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: LinebreakButton }],
    render: LinebreakNode,
    identifier: ["hr"],
    main: LinebreakPlugin,
    markdown: {
      trigger: "space",
      before: /^(-{3})$/,
      change: editor => {
        return editor.setBlocks({ type: "hr" });
      }
    }
  }
];

export default linebreakConfig;
