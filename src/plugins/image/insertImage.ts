import { EditorState, Modifier, SelectionState } from "draft-js";
import { Map } from "immutable";
import { addNewBlockAt } from "../../utils/helper";
import { ImageData, InsertImageType, UpdateImage } from "./types";
import { IMAGE_BLOCK } from "./constants";
import { BlockKey } from "../../types";

const loadAsyncImage = async ({
  src,
  getState,
  setState,
  blockKey,
}: {
  src: string;
  blockKey: string;
  getState: () => EditorState;
  setState: (state: EditorState) => void;
}) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const editorState = getState();
    const newEditorState = setImageBlockData({
      data: { src },
      blockKey,
      state: editorState,
    });
    if (newEditorState) setState(newEditorState);
  };
};

const setImageBlockData = ({
  data,
  blockKey,
  state,
}: {
  data: Partial<ImageData>;
  blockKey: BlockKey;
  state: EditorState;
}) => {
  const content = state.getCurrentContent();
  const imageBlock = content.getBlockForKey(blockKey);
  const next = content.getBlockAfter(imageBlock.getKey());
  if (!next) return;

  const selectionState = new SelectionState({
    anchorKey: imageBlock.getKey(),
    anchorOffset: imageBlock.getText().length,
    focusKey: next.getKey(),
    focusOffset: 0,
  });

  let dataMap = imageBlock.getData();

  for (const key in data) {
    if (dataMap.has(key)) {
      dataMap = dataMap.set(key, data[key]);
    }
  }

  const newContentState = Modifier.setBlockData(
    content,
    selectionState,
    dataMap
  );

  const newEditorState = EditorState.push(
    state,
    newContentState,
    "change-block-data"
  );

  return newEditorState;
};

export const updateImageBlock = ({
  blockKey,
  data,
  setState,
  getState,
}: UpdateImage) => {
  const state = getState();
  const newEditorState = setImageBlockData({
    data,
    blockKey,
    state,
  });
  if (newEditorState) {
    setState(newEditorState);
  }
};

export const insertImage = async ({
  src,
  caption,
  width,
  height,
  placeholderSrc,
  getState,
  setState,
}: InsertImageType) => {
  const state = getState();
  const selection = state.getSelection();
  const dataMap = Map({
    src:
      placeholderSrc || `https://via.placeholder.com/${width}?text=Loading..`,
    type: IMAGE_BLOCK,
    caption,
    width,
    height,
  });
  const anchorKey = selection.getAnchorKey();
  const { newEditorState, addedBlockKey } = addNewBlockAt(
    state,
    anchorKey,
    caption,
    dataMap
  );
  setState(newEditorState);
  await loadAsyncImage({
    src,
    getState,
    setState,
    blockKey: addedBlockKey,
  });

  return addedBlockKey as BlockKey;
};
