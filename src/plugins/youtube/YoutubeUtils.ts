import { Editor } from "slate";

export const applyYoutube = (
  editor: Editor,
  type: string,
  src: string | null
) => editor.setBlocks({ type, data: { src } });
