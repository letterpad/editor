import UnderlineMark from "./UnderlineMark";
import UnderlineButton from "./UnderlineButton";
import { PluginConfig } from "..";
import { UnderlinePlugin } from "./slatePlugin";

const underlineConfig: PluginConfig[] = [
  {
    type: "mark",
    tag: "mark",
    menuButtons: [{ button: UnderlineButton }],
    toolbarButtons: [],
    render: UnderlineMark,
    identifier: ["u"],
    slatePlugin: UnderlinePlugin
  }
];

export default underlineConfig;
