import { EditorState, Modifier, SelectionState } from "draft-js";
import { Map } from "immutable";
import { addNewBlockAt } from "@utils/helper";
import { ImageData, InsertImageType, UpdateImage } from "./types";
import { BlockKey, EditorBlockTypes } from "@src/types";

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

  if (!next) {
    return;
  }

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
  console.log("setting new data");

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
  const content = state.getCurrentContent();
  const blockMap = content.getBlockMap();
  const anchorKey = selection.getAnchorKey();

  const block = blockMap.get(anchorKey);
  const hasNextBlock = !!content.getBlockAfter(block.getKey());

  const dataMap = Map({
    src: hasNextBlock
      ? placeholderSrc ||
        `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`
      : src,
    type: EditorBlockTypes.Image,
    caption,
    width,
    height,
  });

  const { newEditorState, addedBlockKey } = addNewBlockAt(
    state,
    anchorKey,
    caption,
    dataMap
  );

  setState(newEditorState);

  if (!hasNextBlock) return addedBlockKey as BlockKey;

  await loadAsyncImage({
    src,
    getState,
    setState,
    blockKey: addedBlockKey,
  });

  return addedBlockKey as BlockKey;
};

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
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      const editorState = getState();

      const newEditorState = setImageBlockData({
        data: { src },
        blockKey,
        state: editorState,
      });
      if (newEditorState) setState(newEditorState);
      resolve(src);
    });
    img.src = src;
  });
};
