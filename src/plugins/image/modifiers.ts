import { EditorState, SelectionState } from "draft-js";
import { StateTypes, ImageData, UpdateImage } from "./types";
import { addNewBlockAt } from "@utils/helper";
import { insertImage } from ".";
import { setImageBlockData } from "./actions";

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

export const insertImageInEditor = async (
  args: ImageData | ImageData[],
  getEditorState: () => EditorState,
  setEditorState: (state: EditorState) => void
) => {
  return new Promise<string | string[]>(async (resolve) => {
    let hasManyImages = true;
    if (!Array.isArray(args)) {
      hasManyImages = false;
      args = [args];
    }
    let state = getEditorState();
    const returnData: string[] = [];
    for (let i = 0; i < args.length; i++) {
      const data = insertImage({
        ...args[i],
        state,
      });
      if (data.state) {
        returnData.push(data.addedBlockKey);
        // add a new empty block after image
        state = data.state;
        state = addNewBlockAt({
          editorState: state,
          text: " ",
          type: "unstyled",
          pivotBlockKey: data.addedBlockKey,
        }).newEditorState;
      }
    }
    setEditorState(state);
    setTimeout(() => {
      if (hasManyImages) resolve(returnData);
      else resolve(returnData.pop() as string);
    }, 0);
  });
};

export const moveFocusToNextBlock = (state: EditorState, store: StateTypes) => {
  const currentContent = state.getCurrentContent();
  const selection = state.getSelection();
  const anchorKey = selection.getAnchorKey();
  const blockMap = currentContent.getBlockMap();
  const block = blockMap.get(anchorKey);

  if (block.getData().get("type") !== "image") return "not-handled";

  const nextBlock = currentContent.getBlockAfter(block.getKey());

  const newSelection = new SelectionState({
    anchorKey: nextBlock?.getKey(),
    anchorOffset: 0,
    focusKey: nextBlock?.getKey(),
    focusOffset: 0,
  });

  const newEditorState = EditorState.forceSelection(state, newSelection);

  if (store.setEditorState) {
    store.setEditorState(newEditorState);
    return "handled";
  }
  return "not-handled";
};

export const moveFocusToPreviousBlock = (
  state: EditorState,
  store: StateTypes
) => {
  const currentContent = state.getCurrentContent();
  const selection = state.getSelection();
  const anchorKey = selection.getAnchorKey();
  let blockMap = currentContent.getBlockMap();
  const block = blockMap.get(anchorKey);
  const prevBlock = currentContent.getBlockBefore(block.getKey());
  blockMap = blockMap.remove(block.getKey());

  const newSelection = new SelectionState({
    anchorKey: prevBlock?.getKey(),
    anchorOffset: 0,
    focusKey: prevBlock?.getKey(),
    focusOffset: 0,
  });

  const newEditorState = EditorState.forceSelection(state, newSelection);

  if (store.setEditorState) {
    store.setEditorState(newEditorState);
    return "handled";
  }
  return "not-handled";
};
