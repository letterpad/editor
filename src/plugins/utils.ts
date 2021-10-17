import { ContentBlock, EditorState } from "draft-js";

export const getCurrentBlock = (editorState: EditorState) => {
  if (editorState.getSelection) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    return contentState.getBlockForKey(selectionState.getStartKey());
  }
};

export const isEmptyBlock = (contentBlock: ContentBlock) => {
  return contentBlock.getText().trim().length === 0;
};
