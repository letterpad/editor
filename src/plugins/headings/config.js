import React from "react";
import HeadingsButton from "./HeadingsButton";
import HeadingsNode from "./HeadingsNode";
import { HeadingsPlugin } from ".";

export default {
    type: "block",
    tag: "node",
    menuButtons: [
        <HeadingsButton type="heading-one" />,
        <HeadingsButton type="heading-two" />
    ],
    toolbarButtons: [
        <HeadingsButton type="heading-three" />,
        <HeadingsButton type="heading-four" />,
        <HeadingsButton type="heading-five" />
    ],
    render: HeadingsNode,
    identifier: [
        ["h1", "heading-one"],
        ["h2", "heading-two"],
        ["h3", "heading-three"],
        ["h4", "heading-four"],
        ["h5", "heading-five"],
        ["h6", "heading-six"]
    ],
    main: HeadingsPlugin
};
