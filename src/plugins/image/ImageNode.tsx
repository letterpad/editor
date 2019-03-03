import React, {
  SFC,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useState
} from "react";
import { Node, Editor } from "slate";
import { isTextNode } from "../codeblock/CodeblockUtils";
import Alignment from "./Alignment";
import {
  StyledCaption,
  NodeWrapper,
  StyledCaptionInput
} from "./ImageNode.css";

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
  const [caption, setCaption] = useState("");
  const [captionActive, setCaptionActive] = useState(false);

  const [menu, setMenu] = useState(false);
  const alignmentRef = React.useRef<HTMLDivElement>();
  const captionInputRef = React.useRef<any>();

  const showOptions = (e: any) => {
    if (e.target.tagName === "INPUT") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setMenu(true);
  };

  const onOptionClick = (_: KeyboardEvent, option: string) => {
    setAlignOption(option);
  };

  document.addEventListener("mousedown", e => {
    if (!alignmentRef.current) return;
    if (!captionInputRef.current) return;

    if (!alignmentRef.current.contains(e.target as any)) {
      setMenu(false);
    }
  });

  const setImageCaption = (e: any) => {
    setCaption(e.target.value);
  };

  const renderCaptionInput = () => {
    return (
      <StyledCaptionInput
        type="text"
        ref={captionInputRef}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
        onBlur={(e: any) => {
          e.stopPropagation();
          e.preventDefault();
          setCaptionActive(false);
        }}
        placeholder="Enter a caption of the image"
        onChange={setImageCaption}
        value={caption}
      />
    );
  };

  const renderCaption = () => {
    return (
      <StyledCaption
        onMouseDown={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          setCaptionActive(true);
          setTimeout(() => {
            // on clicking the caption, we display the input box.
            // due to the render the focus is lost. This will try to fix that.
            if (captionInputRef.current) {
              captionInputRef.current.focus();
            }
          }, 10);
        }}
      >
        {caption}
      </StyledCaption>
    );
  };
  return (
    <NodeWrapper type={alignOption} ref={alignmentRef} onClick={showOptions}>
      {menu && <Alignment selected={alignOption} onClick={onOptionClick} />}
      <img width="100%" src={node.data.get("src")} {...attributes} />
      {!captionActive && renderCaption()}
      {captionActive && renderCaptionInput()}
    </NodeWrapper>
  );
};

export default ImageNode;
