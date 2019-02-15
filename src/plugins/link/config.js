import React from "react";
import LinkButton from "./LinkButton";
import LinkNode from "./LinkNode";
import { LinkPlugin } from ".";

export default {
    type: "inline",
    tag: "node",
    menuButtons: [<LinkButton />],
    toolbarButtons: [],
    render: LinkNode,
    identifier: ["a"],
    main: LinkPlugin,
    markdown: {
        trigger: "space",
        before: /[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/,
        change: (editor, event, matches) => {
            const lastWord = matches.before[0];
            editor.moveFocusBackward(lastWord.length); // select last word
            const href = lastWord.startsWith("http")
                ? lastWord
                : `https://${lastWord}`;
            editor.wrapInline({ type: "a", data: { href } }); // set URL inline
            editor.moveFocusForward(lastWord.length).insertText(" "); // deselect it
        }
    }
};
