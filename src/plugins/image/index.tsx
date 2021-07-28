import React from "react";
import {
  DefaultDraftBlockRenderMap,
  EditorState,
  EditorBlock,
  ContentBlock,
  genKey,
  ContentState,
} from "draft-js";
import { Map, List } from "immutable";
import { addNewBlockAt } from "../../utils/helper";

export const IMAGE_BLOCK = "IMAGE_BLOCK";

const Caption = props => {
  return (
    <figcaption
      className="custom-block__caption"
      style={{ fontSize: "0.8rem" }}
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

function blockRendererFn(contentBlock) {
  const type = contentBlock.getType();

  if (type === IMAGE_BLOCK) {
    return {
      component: ImageBlock,
      props: {},
    };
  }
}

const ImageBlockMap = {
  [IMAGE_BLOCK]: {
    element: "div",
  },
};

const RenderMap = Map(ImageBlockMap);
RenderMap.merge(DefaultDraftBlockRenderMap);

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(RenderMap);

const insertImage = (editorState: EditorState, src: string) => {
  const selection = editorState.getSelection();

  const { newEditorState } = addNewBlockAt(
    editorState,
    selection.getAnchorKey(),
    IMAGE_BLOCK,
    Map({
      src,
    }),
  );

  return newEditorState;
};

const handleReturn = (
  e: React.SyntheticEvent,
  editorState: EditorState,
  { setEditorState },
) => {
  const newBlock = new ContentBlock({
    key: genKey(),
    type: "unstyled",
    text: "",
    characterList: List(),
  });

  const contentState = editorState.getCurrentContent();
  const newBlockMap = contentState
    .getBlockMap()
    .set(newBlock.getKey(), newBlock);

  return EditorState.push(
    editorState,
    ContentState.createFromBlockArray(newBlockMap.toArray()).set(
      "selectionAfter",
      contentState.getSelectionAfter().merge({
        anchorKey: newBlock.getKey(),
        anchorOffset: 0,
        focusKey: newBlock.getKey(),
        focusOffset: 0,
        isBackward: false,
      }),
    ) as Draft.ContentState,
    "split-block",
  );
};

export const createImagePlugin = () => {
  return {
    blockRendererFn,
    blockrenderMap: extendedBlockRenderMap,
    // handleReturn: handleReturn,
  };
};

export const imageClicked = async (props: any, { getImageUrl }) => {
  const { getEditorState, setEditorState } = props;

  const url = await getImageUrl();
  if (!url) return;

  const newEditorState = insertImage(getEditorState(), url);
  setEditorState(newEditorState);
};
