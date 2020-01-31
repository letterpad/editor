import * as React from "react";

import { Editor, Node } from "slate";

// import Embed from "react-embed";
import Gist from "../components/Embeds/Gist";
import styled from "styled-components";

type Options = {
  getComponent?: (node: Node) => React.ComponentType<any>;
};

function findTopParent(document, node): Node {
  let parent;
  while (node !== document) {
    parent = document.getParent(node.key);
    if (parent === document) return node;
    node = parent;
  }
}

export default function Embeds({ getComponent }: Options) {
  if (!getComponent) {
    getComponent = () => MediaEmbed;
  }
  return {
    normalizeNode(node: Node, editor: Editor, next: Function) {
      if (
        !getComponent ||
        node.type === "block" ||
        node.type !== "link" ||
        node.text !== node.data.get("href")
      )
        return next();

      const component = getComponent(node);
      if (!component) return next();

      const parent = findTopParent(editor.value.document, node);
      if (!parent) return next();

      if (parent.type !== "paragraph" || parent.text !== node.text)
        return next();

      return (editor: Editor) => {
        return editor.replaceNodeByKey(parent.key, {
          object: "block",
          type: "link",
          isVoid: true,
          nodes: [
            {
              object: "text",
              leaves: [{ text: "" }]
            }
          ],
          data: { ...node.data.toJS(), embed: true, component }
        });
      };
    }
  };
}

class MediaEmbed extends React.Component<any> {
  render() {
    const { attributes, node, editor } = this.props;

    return (
      <Container {...attributes} id="embed-video">
        <Gist
          url={node.data.get("href")}
          getEmbedSrc={this.props.editor.props.getEmbedSrc}
        />
        {/* <Embed
          url={node.data.get("href")}
          renderVoid={() => {
            return <div>{node.data.get("href")}</div>;
          }}
        ></Embed> */}
      </Container>
    );
  }
}

const Container = styled.span`
  max-height: 400px;
  overflow-y: scroll;
`;
