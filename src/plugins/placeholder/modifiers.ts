import { EditorBlockTypes } from "@src/types";
import { addBlock, removeBlock } from "@utils/modifiers";
import { ContentBlock, EditorState, Modifier, SelectionState } from "draft-js";

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

  const newEditorState = EditorState.push(
    state,
    newContent,
    "change-block-data"
  );

  // return a new editor state, applying the selection we stored before
  return EditorState.forceSelection(newEditorState, userSelection);
};
