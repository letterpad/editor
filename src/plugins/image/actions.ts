import { addNewBlockAt } from "@utils/helper";
import { EditorState, Modifier, SelectionState } from "draft-js";
import { insertImageInEditor } from "./modifiers";
import {
  ImageBlockData,
  ImageData,
  InsertImageType,
  StateTypes,
} from "./types";
import { Map } from "immutable";
import { EditorBlockTypes } from "@src/_types";

export const insertImage = ({
  src,
  caption,
  width,
  height,
  state,
}: InsertImageType) => {
  const selection = state.getSelection();
  const anchorKey = selection.getAnchorKey();

  const dataMap = Map({
    src: src,
    type: EditorBlockTypes.Image,
    caption,
    width,
    height,
  });

  const { newEditorState, addedBlockKey } = addNewBlockAt({
    editorState: state,
    pivotBlockKey: anchorKey,
    text: caption,
    initialData: dataMap,
  });
  return {
    addedBlockKey,
    state: newEditorState,
  };
};

export const setImageBlockData = ({
  data,
  blockKey,
  state,
}: ImageBlockData) => {
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

export const imageClicked = async (
  props: Required<StateTypes>,
  { getImageUrl }
) => {
  const { getEditorState, setEditorState } = props;

  getImageUrl(
    async (data: ImageData | ImageData[]) =>
      await insertImageInEditor(data, getEditorState, setEditorState)
  );
};
