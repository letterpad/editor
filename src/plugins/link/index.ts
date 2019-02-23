import LinkButton from "./LinkButton";
import LinkNode from "./LinkNode";
import { LinkPlugin } from "./slatePlugin";
import { PluginConfig } from "..";

const linkConfig: PluginConfig[] = [
  {
    type: "inline",
    tag: "node",
    menuButtons: [{ button: LinkButton }],
    toolbarButtons: [],
    render: LinkNode,
    identifier: ["a"],
    slatePlugin: LinkPlugin,
    markdown: {
      trigger: "space",
      before: /[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/,
      change: (editor, _, matches) => {
        const lastWord = matches.before[0];
        editor.moveFocusBackward(lastWord.length); // select last word
        const href = lastWord.startsWith("http")
          ? lastWord
          : `https://${lastWord}`;
        editor.wrapInline({ type: "a", data: { href } }); // set URL inline
        editor.moveFocusForward(lastWord.length).insertText(" "); // deselect it
        return editor;
      }
    }
  }
];

export default linkConfig;
