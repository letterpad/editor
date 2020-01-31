// additional language support based on the most popular programming languages
import "prismjs";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-php";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-bash";

import { Editor, Node } from "slate";

import ChromePlugin from "./Chrome";
import CollapseOnEscape from "slate-collapse-on-escape";
import EditBlockquote from "@wikifactory/slate-edit-blockquote";
import EditCode from "@wikifactory/slate-edit-code";
import EditList from "./EditList";
import EditTable from "@domoinc/slate-edit-table";
import Ellipsis from "./Ellipsis";
import Embeds from "./Embeds";
import InsertImages from "slate-drop-or-paste-images";
import KeyboardBehavior from "./KeyboardBehavior";
import { KeyboardEvent } from "react";
import KeyboardShortcuts from "./KeyboardShortcuts";
import Keymap from "./KeyMap";
import MarkdownPaste from "./MarkdownPaste";
import MarkdownShortcuts from "./MarkdownShortcuts";
import Marks from "../marks";
import Nodes from "../nodes";
import PasteLinkify from "slate-paste-linkify";
import Placeholder from "./Placeholder";
import Prism from "golery-slate-prism";
import Table from "./Table";
import TrailingBlock from "@wikifactory/slate-trailing-block";
import { TypeIframeProps } from "../types";

const createPlugins = ({
  placeholder,
  getLinkComponent
}: {
  placeholder: string;
  getLinkComponent: (
    node: Node,
    attrs: TypeIframeProps
  ) => React.ComponentType<any> | void;
}) => {
  return [
    Nodes,
    Marks,
    PasteLinkify({
      type: "link",
      collapseTo: "end"
    }),
    Placeholder({
      placeholder,
      when: (editor: Editor, node: Node) => {
        if (editor.readOnly) return false;
        if (node.object !== "block") return false;
        if (node.type !== "paragraph") return false;
        if (node.text !== "") return false;
        if (editor.value.document.getBlocks().size > 1) return false;
        return true;
      }
    }),
    InsertImages({
      extensions: ["png", "jpg", "jpeg", "gif", "webp"],
      insertImage: (editor: Editor, file: File) => editor.insertImageFile(file)
    }),
    EditCode({
      containerType: "code",
      lineType: "code-line",
      exitBlocktype: "paragraph",
      allowMarks: false,
      selectAll: true
    }),
    EditBlockquote({
      type: "block-quote",
      typeDefault: "paragraph"
    }),
    EditTable({
      typeTable: "table",
      typeRow: "table-row",
      typeCell: "table-cell",
      typeContent: "paragraph"
    }),
    Table(),
    Prism({
      onlyIn: node => node.type === "code",
      getSyntax: node => node.data.get("language") || "javascript"
    }),
    Embeds({ getComponent: getLinkComponent }),
    CollapseOnEscape({ toEdge: "end" }),
    EditList,
    KeyboardBehavior(),
    KeyboardShortcuts(),
    MarkdownShortcuts(),
    MarkdownPaste(),
    Ellipsis(),
    TrailingBlock({ type: "paragraph" }),
    ChromePlugin(),
    Keymap({
      "mod+Enter": (ev: KeyboardEvent, editor: Editor, next) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (editor.props.onSave) {
          editor.props.onSave({ done: true });
        }
        next();
      },
      "mod+s": (ev: KeyboardEvent, editor: Editor, next) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (editor.props.onSave) {
          editor.props.onSave({ done: false });
        }
        next();
      }
    })

    // Hashtags(),
  ];
};
export default createPlugins;
