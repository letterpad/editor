import React from "react";
import { BoldButton, BoldPlugin } from ".";
import BoldMark from "./BoldMark";

export default {
    type: "mark",
    tag: "mark",
    menuButtons: [<BoldButton />],
    toolbarButtons: [],
    render: BoldMark,
    identifier: ["strong"],
    main: BoldPlugin,
    markdown: {
        trigger: "*",
        before: /(\*\*)(.*?)(\*)/,
        change: (editor, event, matched) => {
            const text = matched.before[0].replace(/\*/g, "");

            editor
                .insertText(text)
                .moveFocusBackward(text.length)
                .addMark("strong")
                .moveFocusForward(text.length)
                .removeMark("strong")
                .insertText(" ");
        }
    }
};
