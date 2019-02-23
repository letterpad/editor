import { Editor } from "slate";

export const applyBlockquote = (editor: Editor, type: string) =>
  editor.setBlocks(type);
