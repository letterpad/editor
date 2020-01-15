import { Editor } from "slate";

export const applyLinebreak = (editor: Editor, type: string) => {
  editor.setBlocks({ type });
  editor
    .moveAnchorToStartOfNextBlock()
    .moveFocusToStartOfNextBlock()
    .focus();
};
