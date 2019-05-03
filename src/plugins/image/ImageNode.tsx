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

const defaultCaption = "Enter a caption";

const ImageNode: SFC<{
  attributes: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  node: Node;
  editor?: Editor;
  isFocused?: boolean;
  hideToolbar?: boolean;
  align?: string;
}> = ({ editor, attributes, node, children, align, hideToolbar }) => {
  if (!hideToolbar) hideToolbar = false;
  if (isTextNode(node)) return null;
  align = node.data.get("align") || align;
  const title = node.data.get("title");

  const [alignOption, setAlignOption] = useState(align || "center");
  const [caption, setCaption] = useState(title || defaultCaption);
  const [editCaptionMode, setEditCaptionMode] = useState(false);

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

    const $imgWrapper = (e!.target! as any).parentElement.firstElementChild;
    if (!$imgWrapper || !editor) return;
    const { dataset, src } = $imgWrapper;
    const key = dataset.key;
    return editor.setNodeByKey(key, {
      type: "img",
      data: {
        src: src,
        title: e.target.value
      }
    });
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
          setEditCaptionMode(false);
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
          setEditCaptionMode(true);
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
      className="lp_img_wrapper"
    >
      {menu && <Alignment selected={alignOption} onClick={onOptionClick} />}
      <img
        width={(node as any).data.get("width") || "100%"}
        height={(node as any).data.get("height") || "auto"}
        src={(node as any).data.get("src")}
        {...attributes}
        title={caption === defaultCaption ? "" : caption}
        data-align={(node as any).data.get("align")}
        data-id="plugin-image"
      />
      {applyCaption({
        caption,
        editCaptionMode,
        renderCaption,
        renderCaptionInput,
        hideToolbar
      })}
    </Wrapper>
  );
};

export default ImageNode;

interface CaptionProps {
  caption?: string;
  editCaptionMode: boolean;
  renderCaption: Function;
  renderCaptionInput: Function;
  hideToolbar: boolean;
}
const applyCaption = ({
  editCaptionMode,
  renderCaption,
  renderCaptionInput,
  hideToolbar
}: CaptionProps) => {
  if (hideToolbar) {
    return null;
  }
  if (editCaptionMode) {
    return renderCaptionInput();
  } else {
    return renderCaption();
  }
};
