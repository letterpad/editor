// import { applyAudio } from "./AudioUtils";
import { hasBlock } from "../../helper/strategy";
import { Editor } from "slate";

const AudioPlugin = () => ({
  onKeyDown(event: KeyboardEvent, editor: Editor, next: () => {}) {
    const type = "audio";
    if (event.key === "Enter") {
      const isActive = hasBlock(editor.value, type);
      if (isActive) {
        event.preventDefault();
        return editor.splitBlock(1).setBlocks("paragraph");
      }
    }
    return next();
  }
});

export { AudioPlugin };
