import React from "react";
import BoldMark from "./BoldMark";
import { AutoReplaceParams } from "slate-auto-replace";
import BoldButton from "./BoldButton";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { isMod } from "../../helper/keyboard-event";
import { applyMarkStrategy } from "../../helper/strategy";

const TAGNAME = "strong";

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const text = matched.before[0].replace(/\*/g, "");

  return editor
    .insertText(text)
    .moveFocusBackward(text.length)
    .addMark(TAGNAME)
    .moveFocusForward(text.length)
    .removeMark(TAGNAME)
    .insertText(" ");
};

const BoldPlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (!isMod(event) || event.key != "b") return next();
        event.preventDefault();
        applyMarkStrategy(editor, TAGNAME);
      }
    }
  };
};

const boldConfig: PluginConfig[] = [
  {
    renderType: "mark",
    menuButtons: [{ button: BoldButton }],
    toolbarButtons: [],
    render: BoldMark,
    identifier: [TAGNAME],
    slatePlugin: BoldPlugin,
    markdown: {
      trigger: "*",
      before: /(\*\*)(.*?)(\*)/,
      change: onChange
    },
    rules: {
      deserialize(el, next) {
        const type = el.tagName.toLowerCase();
        if (type === TAGNAME) {
          return {
            object: "mark",
            type: type,
            nodes: next(el.childNodes)
          };
        }
      },
      serialize(obj, children) {
        if (obj.object === "mark") {
          const props = { children };
          return <BoldMark {...props} />;
        }
      }
    }
  }
];

export default boldConfig;
