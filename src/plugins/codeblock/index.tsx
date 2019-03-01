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
    displayMenu: false,
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
      trigger: "space",
      before: /^```[a-z]/m,
      change: onChange
    },
    rules: {
      // Special case for code blocks, which need to grab the nested childNodes.
      deserialize(el, next) {
        if (el.tagName.toLowerCase() == "pre") {
          const code = el.childNodes[0];
          const childNodes =
            code && (code as any).tagName.toLowerCase() == "code"
              ? code.childNodes
              : el.childNodes;

          return {
            object: "block",
            type: "code",
            nodes: next(childNodes)
          };
        }
      }
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
      "constant",
      "selector",
      "property",
      "number",
      "important",
      "attr-name",
      "attr-value"
    ],
    render: ({ next, ...props }: { next: () => {}; [key: string]: any }) => {
      const { attributes, children, mark } = props;
      const className = "prism-token token " + mark.type;
      return (
        <span {...attributes} className={className}>
          {children}
        </span>
      );
    }
  }
];

export default plugins;
