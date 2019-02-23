import { Editor } from "slate-react";

export const applyHeadings = (editor: Editor, type: string) =>
  editor.setBlocks(type).focus();
