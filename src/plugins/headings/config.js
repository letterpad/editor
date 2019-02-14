import React from "react";
import HeadingsButton from "./HeadingsButton";
import HeadingsNode from "./HeadingsNode";
import { HeadingsPlugin } from ".";

export default {
    type: "block",
    tag: "node",
    menuButtons: [<HeadingsButton type="h1" />, <HeadingsButton type="h2" />],
    toolbarButtons: [
        <HeadingsButton type="h3" />,
        <HeadingsButton type="h4" />,
        <HeadingsButton type="h5" />
    ],
    render: HeadingsNode,
    identifier: ["h1", "h2", "h3", "h4", "h5", "h6"],
    main: HeadingsPlugin
};
