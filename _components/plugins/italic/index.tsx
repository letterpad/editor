import React from "react";
import ItalicMark from "./ItalicMark";
import { AutoReplaceParams } from "slate-auto-replace";
import ItalicButton from "./ItalicButton";
import { PluginConfig } from "..";
import { applyMarkStrategy } from "../../helper/strategy";
import { isKeyboardEvent } from "../../helper/events";
import { isMod } from "../../helper/keyboard-event";
import { MARK } from "../../helper/util";

const TAGNAME = "em";

const ItalicPlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (!isMod(event) || event.key != "i") return next();
        event.preventDefault();
        applyMarkStrategy(editor, TAGNAME);
      }
    }
  };
};

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const text = matched.before[0].replace(/\_/g, "");

  return editor
    .insertText(text)
    .moveFocusBackward(text.length)
    .addMark(TAGNAME)
    .moveFocusForward(text.length)
    .removeMark(TAGNAME)
    .insertText(" ");
};

const italicConfig: PluginConfig[] = [
  {
    renderType: MARK,
    menuButtons: [{ button: ItalicButton }],
    toolbarButtons: [],
    render: ItalicMark,
    identifier: [TAGNAME],
    slatePlugin: ItalicPlugin,
    markdown: {
      trigger: "_",
      before: /(\_\_)(.*?)(\_)/,
      change: onChange
    },
    rules: {
      deserialize(el, next) {
        const type = el.tagName.toLowerCase();
        if (type === TAGNAME) {
          return {
            object: MARK,
            type: type,
            nodes: next(el.childNodes)
          };
        }
      },
      serialize(obj, children) {
        if (obj.object === MARK) {
          const props = { children };
          return <ItalicMark {...props} />;
        }
      }
    }
  }
];

export default italicConfig;
