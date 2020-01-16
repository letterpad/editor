import * as React from "react";
import styled from "styled-components";
// import { CollapsedIcon } from "outline-icons";
// import type { SlateNodeProps } from "../types";
// import headingToSlug from "../lib/headingToSlug";
// import CopyToClipboard from "./CopyToClipboard";
import { SlateNodeProps } from "../types";

type Props = SlateNodeProps & {
  level: number;
  hasPretitle: boolean;
  className: string;
};

function Heading(props: Props) {
  const {
    node,
    editor,
    readOnly,
    children,
    attributes,
    className,
    level = 2
  } = props;

  const firstNode = editor.value.document.nodes.first() === node;
  const slugish = "aaa"; //headingToSlug(editor.value.document, node);
  const showHash = readOnly && !!slugish;
  const Component = `h${level}`;
  const pretitle = "hi"; //editor.props.pretitle || "";
  const title = node.text.trim();
  const startsWithPretitleAndSpace =
    pretitle && title.match(new RegExp(`^${pretitle}\\s`));
  const pathName =
    typeof window !== "undefined" ? window.location.pathname : "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const pathToHeading = `${pathName}#${slugish}`;

  return (
    // @ts-ignore
    <Component {...attributes} className={className}>
      <Wrapper hasPretitle={firstNode && startsWithPretitleAndSpace}>
        {children}
      </Wrapper>
      {/* {showHash && (
        <Anchor
          name={slugish}
          onCopy={() =>
            editor.props.onShowToast &&
            editor.props.onShowToast("Link copied to clipboard")
          }
          text={`${origin}${pathToHeading}`}
        >
          <span>#</span>
        </Anchor>
      )} */}
    </Component>
  );
}

const Wrapper = styled.div<any>`
  display: inline;
  margin-left: ${(props: Props) => (props.hasPretitle ? "-1.2em" : 0)};
`;

const HiddenAnchor = styled.a`
  visibility: hidden;
  display: block;
  position: relative;
  top: -50px;
`;

const Anchor = styled.div`
  visibility: hidden;
  padding-left: 0.25em;
`;

// const Anchor = styled(CopyToClipboard)`
//   visibility: hidden;
//   padding-left: 0.25em;
// `;

export const StyledHeading = styled(Heading)<any>`
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    ${Anchor} {
      color: ${props => props.theme.placeholder};
      visibility: visible;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: ${props => props.theme.text};
      }
    }
  }
`;
export const Heading1 = (props: SlateNodeProps) => (
  <StyledHeading level={1} {...props} />
);
export const Heading2 = (props: SlateNodeProps) => (
  <StyledHeading level={2} {...props} />
);
export const Heading3 = (props: SlateNodeProps) => (
  <StyledHeading level={3} {...props} />
);
export const Heading4 = (props: SlateNodeProps) => (
  <StyledHeading level={4} {...props} />
);
export const Heading5 = (props: SlateNodeProps) => (
  <StyledHeading level={5} {...props} />
);
export const Heading6 = (props: SlateNodeProps) => (
  <StyledHeading level={6} {...props} />
);
