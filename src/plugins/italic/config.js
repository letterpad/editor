import React from "react";
import { ItalicButton, ItalicPlugin } from ".";
import ItalicMark from "./ItalicMark";

export default {
    type: "mark",
    tag: "mark",
    menuButtons: [<ItalicButton />],
    toolbarButtons: [],
    render: ItalicMark,
    identifier: ["em"],
    main: ItalicPlugin,
    markdown: {
        trigger: "_",
        before: /(\_\_)(.*?)(\_)/,
        change: (editor, event, matched) => {
            const text = matched.before[0].replace(/\_/g, "");

            editor
                .insertText(text)
                .moveFocusBackward(text.length)
                .addMark("em")
                .moveFocusForward(text.length)
                .removeMark("em")
                .insertText(" ");
        }
    }
};
