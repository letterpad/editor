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
  Figure,
  StyledCaptionInput,
  Wrapper
} from "./ImageNode.css";

const ImageNode: SFC<{
  attributes: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  node: Node;
  editor?: Editor;
  isFocused?: boolean;
}> = ({ attributes, node, children }) => {
  if (isTextNode(node)) return null;
  const align = node.data.get("align");
  const title = node.data.get("title");

  const [alignOption, setAlignOption] = useState(align || "center");
  const [caption, setCaption] = useState(title || "Image caption");
  const [captionActive, setCaptionActive] = useState(false);

  const [menu, setMenu] = useState(false);
  const alignmentRef = React.useRef<any>();
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
        {caption || " "}
      </StyledCaption>
    );
  };
  if (node.type === "figure") {
    return (
      <Figure
        contentEditable={false}
        type={alignOption}
        ref={alignmentRef}
        {...attributes}
        data-id="plugin-image-figure"
      >
        {children}
      </Figure>
    );
  }

  return (
    <Wrapper
      {...attributes}
      onClick={showOptions}
      type={alignOption}
      src={(node as any).data.get("src")}
    >
      {menu && <Alignment selected={alignOption} onClick={onOptionClick} />}
      <img
        width="100%"
        src={(node as any).data.get("src")}
        {...attributes}
        data-id="plugin-image"
      />
      {!captionActive && renderCaption()}
      {captionActive && renderCaptionInput()}
    </Wrapper>
  );
};

export default ImageNode;
