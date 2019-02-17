import React from "react";
import { ImagePlugin, ImageNode } from ".";
import ImageButton from "./ImageButton";

export default {
    type: "inline",
    tag: "node",
    menuButtons: [],
    toolbarButtons: [<ImageButton />],
    render: ImageNode,
    identifier: ["img"],
    main: ImagePlugin
    // markdown: {
    //     trigger: "space",
    //     before: /^(>)$/,
    //     change: change => change.setBlocks("blockquote")
    // }
};
