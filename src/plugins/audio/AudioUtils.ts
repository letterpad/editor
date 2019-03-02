import { Editor } from "slate";

export const applyAudio = (editor: Editor, type: string, src: string) =>
  editor
    .setBlocks({ type, data: { src } })
    .insertBlock("paragraph")
    .focus();
