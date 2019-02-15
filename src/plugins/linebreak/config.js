import React from "react";
import { LinebreakButton, LinebreakPlugin } from ".";
import LinebreakNode from "./LinebreakNode";

export default {
    type: "block",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [<LinebreakButton />],
    render: LinebreakNode,
    identifier: ["hr"],
    main: LinebreakPlugin,
    markdown: {
        trigger: "space",
        before: /^(-{3})$/,
        change: (editor, event, matches) => {
            editor.setBlocks({ type: "hr", isVoid: true });
        }
    }
};
