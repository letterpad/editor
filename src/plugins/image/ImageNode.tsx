import React, {
  SFC,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useState
} from "react";
import { Node, Editor } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";
import Alignment from "./Alignment";
import styled from "styled-components";

const applyStyles = (type: string) => {
  switch (type) {
    case "left": {
      return `
        margin-left: -100px;
        max-width: 400px;
        display: inline-block;
        float: left;
        margin-right: 40px;
      `;
    }
    case "center": {
      return `
        margin-left: initial;
        max-width: 100%;
      `;
    }
    case "wide": {
      return `
        margin-left: -100px;
        max-width: calc(100% + 200px);
        margin-right: -300px;
      `;
    }
    case "full": {
      return `
        width: 100vw;
        left: -1rem;
        @media screen and (min-width: 740px) {
          left: calc((-100vw + 100%) / 2);
        }
    `;
    }
  }
};

const NodeWrapper = styled.div`
  ${(props: any) => applyStyles(props.type)}
  position: relative;
`;

const ImageNode: SFC<{
  attributes: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  node: Node;
  editor: Editor;
  isFocused: boolean;
}> = ({ attributes, node }) => {
  if (isTextNode(node)) return null;
  const [alignOption, setAlignOption] = useState("center");
  const [menu, setMenu] = useState(false);
  const alignmentRef = React.createRef<HTMLDivElement>();

  const showOptions = () => {
    setMenu(true);
  };

  const onOptionClick = (_: KeyboardEvent, option: string) => {
    setAlignOption(option);
  };

  document.addEventListener("mousedown", e => {
    if (!alignmentRef.current) return;
    if (!alignmentRef.current.contains(e.target as any)) {
      setMenu(false);
    }
  });

  return (
    <NodeWrapper type={alignOption} ref={alignmentRef} onClick={showOptions}>
      {menu && <Alignment selected={alignOption} onClick={onOptionClick} />}
      <img width="100%" src={node.data.get("src")} {...attributes} />
    </NodeWrapper>
  );
};

export default ImageNode;
