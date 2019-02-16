import React from "react";
import { ListPlugin, OrderedListNode } from ".";
import ListButtonBar from "./ListButtonBar";
import UnorderedListNode from "./UnorderedListNode";
import ListItemNode from "./ListItemNode";

export default {
    type: "block",
    tag: "node",
    menuButtons: [<ListButtonBar />],
    toolbarButtons: [],
    render: props => {
        if (props.node.type === "ul") {
            return <UnorderedListNode {...props} />;
        } else if (props.node.type === "ol") {
            return <OrderedListNode {...props} />;
        } else if (props.node.type === "li") {
            return <ListItemNode {...props} />;
        }
    },
    identifier: ["li", "ol", "ul"],
    main: ListPlugin,
    markdown: {
        trigger: "space",
        before: /^(\*|-)$/,
        change: (change, event, matches) => {
            if (matches.before[0] === "*") {
                return change.setBlocks("li").wrapBlock("ol");
            } else {
                return change.setBlocks("li").wrapBlock("ul");
            }
        }
    }
};
