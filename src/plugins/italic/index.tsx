import React from "react";
import ItalicMark from "./ItalicMark";
import { AutoReplaceParams } from "slate-auto-replace";
import ItalicButton from "./ItalicButton";
import { ItalicPlugin } from "./slatePlugin";
import { PluginConfig } from "..";

const TAGNAME = "em";

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

const italicConfig: PluginConfig[] = [
  {
    type: "mark",
    tag: "mark",
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
            object: "mark",
            type: type,
            nodes: next(el.childNodes)
          };
        }
      },
      serialize(obj, children) {
        if (obj.object === "mark") {
          const props = { children };
          return <ItalicMark {...props} />;
        }
      }
    }
  }
];

export default italicConfig;
