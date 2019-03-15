import { Editor } from "slate";

export const applyLinebreak = (editor: Editor, type: string) => {
  editor.insertBlock(type);
  editor
    .moveAnchorToStartOfNextBlock()
    .moveFocusToStartOfNextBlock()
    .focus();
};
