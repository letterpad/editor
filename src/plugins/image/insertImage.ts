import { EditorState, Modifier, SelectionState } from "draft-js";
import { Map } from "immutable";
import { addNewBlockAt } from "../../utils/helper";
import { InsertImageType } from "./types";
import { IMAGE_BLOCK } from "./constants";

const loadAsyncImage = async ({
  src,
  getState,
  setState,
  blockKey,
  dataMap,
}) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const editorState = getState();

    const content = editorState.getCurrentContent();
    const imageBlock = content.getBlockForKey(blockKey);
    const next = content.getBlockAfter(imageBlock.getKey());
    if (!next) return;

    const selectionState = new SelectionState({
      anchorKey: imageBlock.getKey(),
      anchorOffset: imageBlock.getText().length,
      focusKey: next.getKey(),
      focusOffset: 0,
    });

    const newContentState = Modifier.setBlockData(
      content,
      selectionState,
      dataMap.set("src", src)
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-block-data"
    );

    setState(newEditorState);
  };
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
    dataMap,
  });
};
