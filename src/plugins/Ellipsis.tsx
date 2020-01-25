import { Editor } from "slate";
import { isMod } from "../helper/keyboard-event";

export default function Ellipsis() {
  return {
    onKeyDown(ev: React.KeyboardEvent, editor: Editor, next: Function) {
      if (isMod(ev) || ev.key !== " ") return next();

      const { value } = editor;
      const { startBlock, selection } = value;
      if (selection.isExpanded) return next();
      if (!startBlock || startBlock.type.match(/code/)) return next();

      const startOffset = value.selection.start.offset - 3;
      const textNode = startBlock.getFirstText();
      if (!textNode) return next();

      const chars = textNode.text.slice(startOffset, startOffset + 3);

      // replaces three periods with a real ellipsis character
      if (chars === "...") {
        return editor
          .removeTextByKey(textNode.key, startOffset, 3)
          .insertTextByKey(textNode.key, startOffset, "…");
      }

      return next();
    }
  };
}
