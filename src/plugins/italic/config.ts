import ItalicMark from "./ItalicMark";
import { AutoReplaceParams } from "slate-auto-replace";
import ItalicButton from "./ItalicButton";
import { ItalicPlugin } from ".";
import { PluginConfig } from "..";

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const text = matched.before[0].replace(/\*/g, "");

  return editor
    .insertText(text)
    .moveFocusBackward(text.length)
    .addMark("em")
    .moveFocusForward(text.length)
    .removeMark("em")
    .insertText(" ");
};

const italicConfig: PluginConfig[] = [
  {
    type: "mark",
    tag: "mark",
    menuButtons: [{ button: ItalicButton }],
    toolbarButtons: [],
    render: ItalicMark,
    identifier: ["em"],
    main: ItalicPlugin,
    markdown: {
      trigger: "_",
      before: /(\_\_)(.*?)(\_)/,
      change: onChange
    }
  }
];

export default italicConfig;
