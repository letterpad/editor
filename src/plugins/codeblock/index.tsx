// import React from "react";
import CodeblockButton from "./CodeblockButton";
import CodeblockNode from "./CodeblockNode";
import { CodeblockPlugin } from "./slatePlugin";

// import { decorateNode } from "./CodeblockUtils";
import { PluginConfig } from "..";
import { AutoReplaceParams } from "slate-auto-replace";
import { Range, Point } from "slate";

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const { texts } = editor.value;
  const currentTextNode = texts.get(0);
  const currentLineText = currentTextNode.text;
  const language = currentLineText.replace(/`/g, "");

  const currentLineRange = {
    anchor: Point.create({
      key: currentTextNode.key,
      path: null,
      offset: matched.before.index
    }),
    focus: Point.create({
      key: currentTextNode.key,
      path: null,
      offset: matched.before.index + currentLineText.length
    })
  };
  return editor
    .deleteAtRange(Range.create(currentLineRange))
    .insertBlock({ type: "pre", data: { language } })
    .focus();
};

const plugins: PluginConfig[] = [
  {
    type: "block",
    tag: "node",
    menuButtons: [
      {
        button: CodeblockButton
      }
    ],
    onPasteReturnHtml: false,
    render: CodeblockNode,
    identifier: ["pre"],
    slatePlugin: CodeblockPlugin,
    markdown: {
      trigger: "space",
      before: /^```/m,
      change: onChange
    }
  }
];

export default plugins;
