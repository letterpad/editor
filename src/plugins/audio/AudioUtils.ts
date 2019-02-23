import { Editor } from "slate-react";

export const applyAudio = (editor: Editor, type: string, src: string) =>
  editor.setBlocks({ type, data: { src } });
