import React, { Component, DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";
import { Node, Editor } from "slate";

const CodeblockContainer = styled.pre`
  background: var(--base-shade-2);
  color: var(--color-text-2) !important;
  color: inherit;
  padding: 16px;
  line-height: 23px;
  font-size: 16px;
  overflow-x: auto;
`;

class CodeblockNode extends Component<{
  node?: Node;
  editor?: Editor;
  attributes?: DetailedHTMLProps<
    HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >;
}> {
  render() {
    const { attributes, children } = this.props;
    return (
      <CodeblockContainer {...attributes} data-id="plugin-codeblock">
        {children}
      </CodeblockContainer>
    );
  }
}

export default CodeblockNode;
