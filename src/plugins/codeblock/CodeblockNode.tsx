import React, {
  Component,
  DetailedHTMLProps,
  HTMLAttributes,
  ChangeEvent
} from "react";
import styled from "styled-components";
import { Node, Editor } from "slate";
import { isTextNode } from "./CodeblockUtils";

const CodeblockContainer = styled.div`
  position: relative;
`;

const CodeblockLang = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  font-size: 14px;
  padding: 4px;
  background-color: transparent;
  color: #555;
  border-radius: 3px;
  text-transform: uppercase;
`;

/* eslint-disable react/prop-types */
class CodeblockNode extends Component<{
  node: Node;
  editor: Editor;
  attributes: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
}> {
  state = {
    language:
      (!isTextNode(this.props.node) && this.props.node.data.get("language")) ||
      "js"
  };

  onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { node, editor } = this.props;
    this.setState({ language: event.target && event.target.value });
    editor.setNodeByKey(node.key, {
      data: {
        language: event.target.value
      }
    } as any);
  };

  render() {
    const { attributes, children } = this.props;
    return (
      <CodeblockContainer>
        <pre
          className="prism-dark"
          {...attributes}
          data-language={this.state.language}
        >
          {children}
        </pre>
        <CodeblockLang contentEditable={false}>
          <select value={this.state.language} onChange={this.onChange}>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            <option value="html">HTML</option>
          </select>
        </CodeblockLang>
      </CodeblockContainer>
    );
  }
}

export default CodeblockNode;
