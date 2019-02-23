import { Editor } from "slate";

export const applyHeadings = (editor: Editor, type: string) =>
  editor.setBlocks(type).focus();
