import { UnderlinePlugin } from ".";
import UnderlineMark from "./UnderlineMark";
import UnderlineButton from "./UnderlineButton";
import { PluginConfig } from "..";

const underlineConfig: PluginConfig = {
  type: "mark",
  tag: "mark",
  menuButtons: [{ button: UnderlineButton }],
  toolbarButtons: [],
  render: UnderlineMark,
  identifier: ["u"],
  main: UnderlinePlugin
};

export default underlineConfig;
