import { UnderlinePlugin } from ".";
import UnderlineMark from "./UnderlineMark";
import UnderlineButton from "./UnderlineButton";

export default {
  type: "mark",
  tag: "mark",
  menuButtons: [{ button: UnderlineButton }],
  toolbarButtons: [],
  render: UnderlineMark,
  identifier: ["u"],
  main: UnderlinePlugin
};
