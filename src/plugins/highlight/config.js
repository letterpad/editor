import React from "react";
import HighlightButton from "./HighlightButton";
import HighlightMark from "./HighlightMark";
import { HighlightPlugin } from ".";

export default {
    type: "mark",
    tag: "mark",
    menuButtons: [<HighlightButton type="heading-one" />],
    toolbarButtons: [],
    render: HighlightMark,
    identifier: ["code"],
    main: HighlightPlugin,
    markdown: {
        trigger: "space",
        before: /\s?(`|``)((?!\1).)+?\1$/,
        change: (editor, event, matched) => {
            const text = matched.before[0].replace(/\`/g, "");

            editor
                .insertText(text)
                .moveFocusBackward(text.length)
                .addMark("code")
                .moveFocusForward(text.length)
                .removeMark("code")
                .insertText(" ");
        }
    }
};
