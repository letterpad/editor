import { EditorBlockTypes } from "@src/types";
import { addBlock, removeBlock } from "@utils/modifiers";
import { ContentBlock, EditorState, Modifier, SelectionState } from "draft-js";
import { Map } from "immutable";

export const addPlaceholder = (state: EditorState, data) => {
  return addBlock(state, EditorBlockTypes.Placeholder, data);
};

export const removePlaceholder = (state: EditorState, key: string) => {
  return removeBlock(state, key);
};

export const setPlaceHolderWithError = (
  state: EditorState,
  block: ContentBlock
) => {
  // const contentState = state.getCurrentContent();
  // const selection = state.getSelection();
  // const entity = contentState.getEntity(key);
  // const exisitingData = entity.getData();
  // const newContentState = Modifier.setBlockData(
  //   contentState,
  //   selection,
  //   Map({
  //     ...exisitingData,
  //     error: true,
  //   })
  // );

  // save the actual selection to use later
  const userSelection = state.getSelection();

  const newData = block.getData().set("error", true);
  // create a new selection with the block I want to change
  const selection = SelectionState.createEmpty(block.getKey());

  const newContent = Modifier.setBlockData(
    state.getCurrentContent(),
    selection,
    newData
  );

  const newEditor = EditorState.push(state, newContent, "change-block-data");

  // return a new editor state, applying the selection we stored before
  return EditorState.forceSelection(newEditor, userSelection);
};
