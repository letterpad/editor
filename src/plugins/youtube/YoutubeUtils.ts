import { Editor } from "slate-react";

export const applyYoutube = (editor: Editor, type: string, src: string) =>
  editor.setBlocks({ type, data: { src } });
