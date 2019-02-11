import React from "react";
import HeadingsButton from "./HeadingsButton";
import HeadingsNode from "./HeadingsNode";
import { HeadingsPlugin } from ".";

export default {
    type: "node",
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
    main: HeadingsPlugin
};
