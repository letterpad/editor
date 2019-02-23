import { LinebreakPlugin } from "./slatePlugin";
import LinebreakNode from "./LinebreakNode";
import { PluginConfig } from "..";
import LinebreakButton from "./LinebreakButton";

const linebreakConfig: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [{ button: LinebreakButton }],
    render: LinebreakNode,
    identifier: ["hr"],
    slatePlugin: LinebreakPlugin,
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
