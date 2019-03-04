import React, { Component, DetailedHTMLProps, HTMLAttributes } from "react";
import styled from "styled-components";
import { Node, Editor } from "slate";

const CodeblockContainer = styled.div`
  position: relative;
  .prism-dark {
    background: #eee;
    color: inherit;
    padding: 16px;
    line-height: 23px;
    font-size: 18px;
  }
`;

class CodeblockNode extends Component<{
  node: Node;
  editor: Editor;
  attributes: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
}> {
  render() {
    const { attributes, children } = this.props;
    return (
      <CodeblockContainer>
        <pre className="prism-dark" {...attributes}>
          {children}
        </pre>
      </CodeblockContainer>
    );
  }
}

export default CodeblockNode;
