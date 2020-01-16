import { Editor } from "slate";
import { getEventTransfer } from "slate-react";
import Markdown from "../serializer";

export default function MarkdownPaste() {
  return {
    onPaste(ev: React.SyntheticEvent, editor: Editor, next: Function) {
      const transfer = getEventTransfer(ev);
      //@ts-ignore
      const { text } = transfer;
      if (transfer.type !== "text" && transfer.type !== "html") return next();

      const fragment = Markdown.deserialize(text || "");
      if (!fragment) return;

      return editor.insertFragment(fragment.document);
    }
  };
}
