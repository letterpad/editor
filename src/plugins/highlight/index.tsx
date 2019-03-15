import React from "react";
import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import HighlightButton from "./HighlightButton";
import HighlightMark from "./HighlightMark";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

const TAGNAME = "code";

const HighlightPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    if (!isKeyboardEvent(event)) return next();
    if (!isMod(event) || event.key != "m") return next();
    event.preventDefault();
    applyMarkStrategy(editor, TAGNAME);
  }
});

const highlightConfig: PluginConfig[] = [
  {
    type: "mark",
    renderType: "mark",
    menuButtons: [
      {
        button: HighlightButton
      }
    ],
    render: HighlightMark,
    identifier: [TAGNAME],
    slatePlugin: HighlightPlugin,
    markdown: {
      trigger: "`",
      before: /`([^`\n\r]+)/, // needs to be corrected
      change: (editor, _, matched) => {
        const text = matched.before[0].replace(/\`/g, "");
        return editor
          .deleteBackward(1)
          .insertText(text)
          .moveFocusBackward(text.length)
          .addMark(TAGNAME)
          .moveFocusForward(text.length)
          .removeMark(TAGNAME)
          .insertText(" ");
      }
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
          return <HighlightMark {...props} />;
        }
      }
    }
  }
];

export default highlightConfig;
