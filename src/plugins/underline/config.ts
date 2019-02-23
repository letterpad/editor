import { UnderlineButton, UnderlinePlugin } from ".";
import UnderlineMark from "./UnderlineMark";

export default {
  type: "mark",
  tag: "mark",
  menuButtons: [{ button: UnderlineButton }],
  toolbarButtons: [],
  render: UnderlineMark,
  identifier: ["u"],
  main: UnderlinePlugin
};
