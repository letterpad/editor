import React from "react";
import LinkButton from "./LinkButton";
import LinkNode from "./LinkNode";
import { PluginConfig } from "..";
import LinkKeyboardShortcut from "./LinkKeyboardShortcut";
import { nodeTypes } from "../../helper/util";

const TAGNAME = "a";

const LinkPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(...args) {
    return LinkKeyboardShortcut(...args);
  }
});

const linkConfig: PluginConfig[] = [
  {
    renderType: "node",
    menuButtons: [{ button: LinkButton }],
    toolbarButtons: [],
    render: LinkNode,
    identifier: [TAGNAME],
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

        return editor
          .wrapInline({ type: TAGNAME, data: { href } })
          .moveFocusForward(href.length)
          .insertText(" ");
      }
    },
    rules: {
      serialize: (obj, children) => {
        if (obj.object !== nodeTypes.INLINE) {
          return;
        }
        const props = { children, node: obj, attributes: {} };
        if (obj.type === TAGNAME) {
          return <LinkNode {...props} />;
        }
      },
      deserialize: (el, next) => {
        const type = el.tagName.toLowerCase();
        if (type === TAGNAME) {
          return {
            object: nodeTypes.INLINE,
            type: type,
            data: {
              className: el.getAttribute("class"),
              href: el.getAttribute("href") || null
            },
            nodes: next(el.childNodes)
          };
        }
      }
    }
  }
];

export default linkConfig;
