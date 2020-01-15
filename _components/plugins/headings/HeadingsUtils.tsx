import { Editor } from "slate";

export const applyHeadings = (editor: Editor, type: any) =>
  editor.setBlocks(type).focus();
