import React from "react";
import {
  EditorState,
  EditorBlock,
} from "draft-js";
import {Map, List} from "immutable";
import {addNewBlockAt} from "../../utils/helper";

export const IMAGE_BLOCK = "IMAGE";

const Caption = props => {
  return (
    <figcaption
      className="custom-block__caption"
      style={{fontSize: "0.8rem"}}
    >
      <EditorBlock {...props} />
    </figcaption>
  );
};

const ImageBlock = props => {
  const imgSrc = props.block.get("data").get("src");

  return (
    <div className="my-custom-block">
      <figure className="custom-block__image-wrap">
        <img src={imgSrc} className="custom-block__image" />
        <Caption {...props} />
      </figure>
    </div>
  );
};

function blockRendererFn(block) {
  const type = block.getType();

if(type === "atomic") {
  const blockType = block.get("data").get("type");

  if(blockType === "IMAGE") {
    return {
      component: ImageBlock,
      props: {},
    };
  }
}
}


const insertImage = (src: string, editorState: EditorState) => {
  const selection = editorState.getSelection();

  const {newEditorState} = addNewBlockAt(
    editorState,
    selection.getAnchorKey(),
    IMAGE_BLOCK,
    Map({
      src,
      type: IMAGE_BLOCK
    }),
  );

  return newEditorState;
};

export const createImagePlugin = () => {
  return {
    blockRendererFn,
  };
};

export const imageClicked = async (props: any, {getImageUrl}) => {
  const {getEditorState, setEditorState} = props;
  const hook = (url:string) => {
    if (!url) return;
    const newEditorState = insertImage(url,getEditorState());
    setEditorState(newEditorState);
  }
  getImageUrl(hook);
};
