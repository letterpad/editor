import { BoldPlugin } from ".";
import BoldMark from "./BoldMark";
import { AutoReplaceParams } from "slate-auto-replace";
import BoldButton from "./BoldButton";

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const text = matched.before[0].replace(/\*/g, "");

  return editor
    .insertText(text)
    .moveFocusBackward(text.length)
    .addMark("strong")
    .moveFocusForward(text.length)
    .removeMark("strong")
    .insertText(" ");
};

export default {
  type: "mark",
  tag: "mark",
  menuButtons: [{ button: BoldButton }],
  toolbarButtons: [],
  render: BoldMark,
  identifier: ["strong"],
  main: BoldPlugin,
  markdown: {
    trigger: "*",
    before: /(\*\*)(.*?)(\*)/,
    change: onChange
  }
};
