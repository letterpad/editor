import * as React from "react";

import { SlateNodeProps } from "../types";

export default function Link(props: SlateNodeProps) {
  const { attributes, node, children, editor, readOnly } = props;
  //@ts-ignore
  const embed = node.data.get("embed");
  //@ts-ignore
  const Component = node.data.get("component");
  //@ts-ignore
  const href = node.data.get("href");

  if (embed && Component) {
    return (
      <div contentEditable={false} {...props.attributes}>
        <Component {...props} matches={node.data.get("matches")} />
      </div>
    );
  }

  return (
    <a
      {...attributes}
      href={readOnly ? href : undefined}
      className="lp-a"
      onClick={
        readOnly
          ? ev => {
              //@ts-ignore
              if (editor.props.onClickLink) {
                ev.preventDefault();
                //@ts-ignore
                editor.props.onClickLink(href);
              }
            }
          : undefined
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
