import { EditorBlockTypes } from "@src/_types";
import { addAtomicBlock } from "@utils/modifiers";
import { EditorState } from "draft-js";

export const addEmbed = (editorState: EditorState, data) => {
  return addAtomicBlock(editorState, EditorBlockTypes.Embed, data);
};
