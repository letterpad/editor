import { Editor } from "slate";

// import { Editor } from "slate-react";

export const applyYoutube = (
  editor: Editor,
  type: string,
  src: string | null
) => editor.setBlocks({ type, data: { src } });
