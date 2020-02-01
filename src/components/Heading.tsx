import * as React from "react";

import { SlateNodeProps } from "../types";
import styled from "styled-components";

type Props = SlateNodeProps & {
  level: number;
  hasTitle: boolean;
  className: string;
};

function Heading(props: Props) {
  const { node, editor, children, attributes, className, level = 2 } = props;

  const firstNode = editor.value.document.nodes.first() === node;
  const Component = `h${level}`;
  const pretitle = editor.props.title || "";
  const title = node.text.trim();
  const startsWithPretitleAndSpace =
    pretitle && title.match(new RegExp(`^${pretitle}\\s`));

  return (
    // @ts-ignore
    <Component {...attributes} className={className}>
      <Wrapper hasPretitle={firstNode && startsWithPretitleAndSpace}>
        {children}
      </Wrapper>
    </Component>
  );
}

const Wrapper = styled.div<{ hasPretitle: boolean }>`
  display: inline;
  margin-left: ${props => (props.hasPretitle ? "-1.2em" : 0)};
`;

export const StyledHeading = styled(Heading)<any>`
  display: flex;
  align-items: center;
  position: relative;
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
