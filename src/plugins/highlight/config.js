import React from "react";
import HighlightButton from "./HighlightButton";
import HighlightMark from "./HighlightMark";
import { HighlightPlugin } from ".";

export default {
    type: "mark",
    menuButtons: [<HighlightButton type="heading-one" />],
    toolbarButtons: [],
    render: HighlightMark,
    main: HighlightPlugin
};
