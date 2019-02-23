import BoldMark from "./BoldMark";
import { AutoReplaceParams } from "slate-auto-replace";
import BoldButton from "./BoldButton";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { isMod } from "../../helper/keyboard-event";
import { applyMarkStrategy } from "../../helper/strategy";

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

const BoldPlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (!isMod(event) || event.key != "b") return next();
        event.preventDefault();
        applyMarkStrategy(editor, "b");
      }
    }
  };
};

const boldConfig: PluginConfig[] = [
  {
    type: "mark",
    tag: "mark",
    menuButtons: [{ button: BoldButton }],
    toolbarButtons: [],
    render: BoldMark,
    identifier: ["strong"],
    slatePlugin: BoldPlugin,
    markdown: {
      trigger: "*",
      before: /(\*\*)(.*?)(\*)/,
      change: onChange
    }
  }
];

export default boldConfig;
