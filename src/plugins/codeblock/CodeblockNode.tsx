import React, { Component, DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";
import { Node, Editor } from "slate";

const CodeblockContainer = styled.section`
  position: relative;
  pre {
    background: var(--bg-sections);
    color: var(--color-text-3);
    color: inherit;
    padding: 16px;
    line-height: 23px;
    font-size: 16px;
    overflow-x: auto;
  }
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
      <CodeblockContainer>
        <pre {...attributes}>{children}</pre>
      </CodeblockContainer>
    );
  }
}

export default CodeblockNode;
