import * as React from "react";
import { Editor } from "slate";
// import styled from "styled-components";

// import Code from "./components/Code";
// import BlockToolbar from "./components/Toolbar/BlockToolbar";
import HorizontalRule from "./components/HorizontalRule";
// import Image from "./components/Image";
// import Link from "./components/Link";
// import Hashtag from "./components/Hashtag";
// import Table from "./components/Table";
// import Cell from "./components/Table/Cell";
// import Row from "./components/Table/Row";
import ListItem from "./components/ListItem";
import TodoList from "./components/TodoList";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6
} from "./components/Heading";

import Paragraph from "./components/Paragraph";
// import type { SlateNodeProps } from "./types";

function renderBlock(props: any, _editor: Editor, next: Function) {
  const { attributes } = props;

  const hidden = props.node.data.get("hidden");
  if (hidden) attributes.style = { display: "none" };

  switch (props.node.type) {
    case "paragraph":
      return <Paragraph {...props} />;
    // case "block-toolbar":
    //   return <BlockToolbar {...props} />;
    case "block-quote":
      return <blockquote {...attributes}>{props.children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{props.children}</ul>;
    case "ordered-list":
      return <ol {...attributes}>{props.children}</ol>;
    case "todo-list":
      return <TodoList {...attributes}>{props.children}</TodoList>;
    // case "table":
    //   return <Table {...props}>{props.children}</Table>;
    // case "table-row":
    //   return <Row {...props} />;
    // case "table-cell":
    //   return <Cell {...props} />;
    case "list-item":
      return <ListItem {...props} />;
    case "horizontal-rule":
      return <HorizontalRule {...props} />;
    // case "code":
    //   return <Code {...props} />;
    case "code-line":
      return <pre {...attributes}>{props.children}</pre>;
    // case "image":
    //   return <Image {...props} />;
    // case "link":
    //   return <Link {...props} />;
    // case "hashtag":
    //   return <Hashtag {...props} />;
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

export default { renderBlock };
