import React from "react";
import UnderlineMark from "./UnderlineMark";
import UnderlineButton from "./UnderlineButton";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";

const TAGNAME = "u";

const UnderlinePlugin: PluginConfig["slatePlugin"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (!isMod(event) || event.key != TAGNAME) return next();
        event.preventDefault();
        applyMarkStrategy(editor, "u");
      }
    }
  };
};

const underlineConfig: PluginConfig[] = [
  {
    type: "mark",
    renderType: "mark",
    menuButtons: [{ button: UnderlineButton }],
    toolbarButtons: [],
    render: UnderlineMark,
    identifier: [TAGNAME],
    slatePlugin: UnderlinePlugin,
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
          return <UnderlineMark {...props} />;
        }
      }
    }
  }
];

export default underlineConfig;
