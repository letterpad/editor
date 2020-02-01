import * as React from "react";

import { Editor, Mark } from "slate";

type Props = {
  children: any;
  mark: Mark;
};

function renderMark(props: Props, _editor: Editor, next: Function) {
  switch (props.mark.type) {
    case "bold":
      return <strong className="lp-strong">{props.children}</strong>;
    case "code":
      return <code className="lp-code">{props.children}</code>;
    case "italic":
      return <em className="lp-em">{props.children}</em>;
    case "underlined":
      return <u className="lp-u">{props.children}</u>;
    case "deleted":
      return <del className="lp-del">{props.children}</del>;
    case "inserted":
      return <mark className="lp-mark">{props.children}</mark>;
    default:
      return next();
  }
}

export default { renderMark };
