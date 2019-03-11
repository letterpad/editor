import { Editor } from "slate";

export const applyLinebreak = (editor: Editor, type: string) => {
  return editor
    .setBlocks(type)
    .moveFocusToEndOfBlock()
    .focus();
};
