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
    decorator: decorateNode,
    render: (props: any) => {
      console.log(props.node.type);
      return <CodeblockNode {...props} />;
    },
    identifier: ["pre"],
    slatePlugin: CodeblockPlugin,
    markdown: {
      trigger: "space",
      before: /^```[a-z]/m,
      change: onChange
    }
  },
  {
    type: "mark",
    tag: "mark",
    menuButtons: [],
    toolbarButtons: [],
    identifier: [
      "comment",
      "keyword",
      "puntuation",
      "tag",
      "constant",
      "selector"
    ],
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
        case "selector":
          return (
            <span
              {...attributes}
              className={className}
              style={{ color: "red" }}
            >
              {children}
            </span>
          );
      }
      return null;
    }
  }
];

export default plugins;
