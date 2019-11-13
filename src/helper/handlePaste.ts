import { getEventTransfer } from "slate-react";
import snarkdown from "snarkdown";
import { pluginConfigs } from "../plugins";
import { Editor } from "slate";
import Html from "slate-html-serializer";

export const handlePaste = (
  event: React.ClipboardEvent,
  editor: Editor,
  htmlRules: Html
) => {
  const transfer = getEventTransfer(event);
  if (transfer.type != "html") {
    // convert markdown to html
    let html = snarkdown((transfer as any).text);
    const { document } = htmlRules.deserialize(html);
    return editor.insertFragment(document);
  }

  const parentTag = editor.value.blocks.first().type; // p, pre, etc
  for (let i = 0; i < pluginConfigs.length; i++) {
    const config = pluginConfigs[i];
    if (config.onPasteReturnHtml === false) {
      if (config.identifier && config.identifier.indexOf(parentTag) >= 0) {
        return editor.insertText((transfer as any).text);
      }
    }
  }
  // remove style attr
  const REMOVE_STYLE_ATTR = /style="[^\"]*"/gi;
  let html = (transfer as any).html.replace(REMOVE_STYLE_ATTR, "");
  // TODO: fix the transfer as any
  const { document } = htmlRules.deserialize(html);
  editor.insertFragment(document);
};
