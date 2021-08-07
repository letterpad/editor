import React from "react";
import {
  EditorState,
  EditorBlock,
  ContentBlock,
  genKey,
  ContentState,
  CharacterMetadata,
} from "draft-js";
import { Map, List, Repeat } from "immutable";
import { addNewBlockAt } from "../../utils/helper";
import { TypeMediaInsert } from "../../types";

export const IMAGE_BLOCK = "IMAGE";

const Caption = (props) => {
  return (
    <figcaption
      className="custom-block__caption"
      style={{ fontSize: "0.8rem" }}
    >
      <EditorBlock {...props} />
    </figcaption>
  );
};

const ImageBlock = (props) => {
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

  if (type === "atomic") {
    const blockType = block.get("data").get("type");
    if (blockType === "IMAGE") {
      return {
        component: ImageBlock,
        editable: true,
        props: {},
      };
    }
  }
}

const insertImage = (
  src: string,
  caption: string,
  editorState: EditorState
) => {
  const selection = editorState.getSelection();

  const { newEditorState } = addNewBlockAt(
    editorState,
    selection.getAnchorKey(),
    caption,
    Map({
      src,
      type: IMAGE_BLOCK,
      caption,
    })
  );

  return newEditorState;
};

export const createImagePlugin = () => {
  return {
    blockRendererFn,
  };
};

export const imageClicked = async (props: any, { getImageUrl }) => {
  const { getEditorState, setEditorState } = props;
  const hook = (args: TypeMediaInsert | TypeMediaInsert[]) => {
    if (!Array.isArray(args)) {
      args = [args];
    }
    let state = getEditorState();
    for (let i = 0; i < args.length; i++) {
      const { url, caption } = args[i];
      state = insertImage(url, caption || "", state);
    }
    setEditorState(state);
  };
  getImageUrl(hook);
};
