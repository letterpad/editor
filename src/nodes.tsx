import * as React from "react";

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6
} from "./components/Heading";

import BlockToolbar from "./components/BlockToolbar";
import Cell from "./components/Table/Cell";
import CheckList from "./components/CheckList";
import Code from "./components/Code";
import { Editor } from "slate";
import HorizontalRule from "./components/HorizontalRule";
import Image from "./components/Image";
import Link from "./components/Link";
import ListItem from "./components/ListItem";
import Paragraph from "./components/Paragraph";
import Row from "./components/Table/Row";
import Table from "./components/Table";

function renderNode(props: any, _editor: Editor, next: Function) {
  const { attributes } = props;

  const hidden = props.node.data.get("hidden");
  if (hidden) attributes.style = { display: "none" };

  switch (props.node.type) {
    case "paragraph":
      return <Paragraph {...props} />;
    case "block-toolbar":
      return <BlockToolbar {...props} />;
    case "block-quote":
      return <blockquote {...attributes}>{props.children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{props.children}</ul>;
    case "ordered-list":
      return <ol {...attributes}>{props.children}</ol>;
    case "check-list":
      return <CheckList {...attributes}>{props.children}</CheckList>;
    case "table":
      return <Table {...props}>{props.children}</Table>;
    case "table-row":
      return <Row {...props} />;
    case "table-cell":
      return <Cell {...props} />;
    case "list-item":
      return <ListItem {...props} />;
    case "horizontal-rule":
      return <HorizontalRule {...props} />;
    case "code":
      return <Code {...props} />;
    case "code-line":
      return <pre {...attributes}>{props.children}</pre>;
    case "image":
      return <Image {...props} />;
    case "link":
      return <Link {...props} />;
    case "heading1":
      return <Heading1 {...props} />;
    case "heading2":
      return <Heading2 {...props} />;
    case "heading3":
      return <Heading3 {...props} />;
    case "heading4":
      return <Heading4 {...props} />;
    case "heading5":
      return <Heading5 {...props} />;
    case "heading6":
      return <Heading6 {...props} />;
    default:
      return next();
  }
}

export default { renderNode };
