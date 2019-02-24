import React from "react";
import CodeblockButton from "./CodeblockButton";
import CodeblockNode from "./CodeblockNode";
import { CodeblockPlugin } from "./slatePlugin";

import { decorateNode } from "./CodeblockUtils";
import { PluginConfig } from "..";
import { AutoReplaceParams } from "slate-auto-replace";
import { Range, Point } from "slate";

const onChange: AutoReplaceParams["change"] = (editor, _, matched) => {
  const { texts } = editor.value;
  const currentTextNode = texts.get(0);
  const currentLineText = currentTextNode.text;

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
    .insertBlock("pre")
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
    decorator: decorateNode,
    render: (props: any) => {
      return <CodeblockNode {...props} />;
    },
    identifier: ["pre"],
    slatePlugin: CodeblockPlugin,
    markdown: {
      trigger: "enter",
      before: /^```[a-z]/m,
      change: onChange
    }
  },
  {
    type: "mark",
    tag: "mark",
    menuButtons: [],
    toolbarButtons: [],
    render: ({ next, ...props }: { next: () => {}; [key: string]: any }) => {
      const { attributes, children, mark } = props;
      const className = "prism-token token " + mark.type;

      switch (props.mark.type) {
        case "comment":
          return (
            <span
              {...attributes}
              className={className}
              style={{ opacity: "0.33" }}
            >
              {children}
            </span>
          );
        case "keyword":
          return (
            <span
              {...attributes}
              className={className}
              style={{ fontWeight: "bold" }}
            >
              {children}
            </span>
          );
        case "tag":
          return (
            <span
              {...attributes}
              className={className}
              style={{ fontWeight: "bold" }}
            >
              {children}
            </span>
          );
        case "punctuation":
          return (
            <span
              {...attributes}
              className={className}
              style={{ opacity: "0.75" }}
            >
              {children}
            </span>
          );
      }
      return null;
    },
    identifier: ["comment", "keyword", "puntuation", "tag", "constant"]
  }
];

export default plugins;
