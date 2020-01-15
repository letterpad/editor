
import * as React from "react";
import { Mark, Editor } from "slate";
// import InlineCode from "./components/InlineCode";

type Props = {
  children: any;
  mark: Mark;
};

function renderMark(props: Props, _editor: Editor, next: Function) {
  switch (props.mark.type) {
    case "bold":
      return <strong>{props.children}</strong>;
    case "code":
      return <code>{props.children}</code>;
    case "italic":
      return <em>{props.children}</em>;
    case "underlined":
      return <u>{props.children}</u>;
    case "deleted":
      return <del>{props.children}</del>;
    case "inserted":
      return <mark>{props.children}</mark>;
    default:
      return next();
  }
}

export default { renderMark };
