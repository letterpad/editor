/* eslint-disable react/prop-types */
import React from "react";
// Nodes
import { ImageNode } from "../plugins/image";
import { LinkNode } from "../plugins/link";
import { BlockquoteNode } from "../plugins/blockquote";
import { LinebreakNode } from "../plugins/linebreak";
import { HeadingsNode } from "../plugins/headings";
import { CodeblockNode } from "../plugins/codeblock";
import {
    ListItemNode,
    OrderedListNode,
    UnorderedListNode
} from "../plugins/list";

// Marks
import { BoldMark } from "../plugins/bold";
import { ItalicMark } from "../plugins/italic";
import { UnderlineMark } from "../plugins/underline";
import { HighlightMark } from "../plugins/highlight";

export const nodeRenderer = (props, editor, next) => {
    switch (props.node.type) {
        case "code_block":
            return <CodeblockNode {...props} />;
        case "line-break":
            return <LinebreakNode {...props} />;
        case "image":
            return <ImageNode {...props} />;
        case "block-quote":
            return <BlockquoteNode {...props} />;
        case "heading-one":
        case "heading-two":
        case "heading-three":
        case "heading-four":
        case "heading-five":
        case "heading-six":
            return <HeadingsNode {...props} />;
        case "link":
            return <LinkNode {...props} />;
        case "list-item":
            return <ListItemNode {...props} />;
        case "ordered-list":
            return <OrderedListNode {...props} />;
        case "unordered-list":
            return <UnorderedListNode {...props} />;
        default:
            return next();
    }
};

export const markRenderer = (props, editor, next) => {
    switch (props.mark.type) {
        case "bold":
            return <BoldMark {...props} />;
        case "highlight":
            return <HighlightMark {...props} />;
        case "italic":
            return <ItalicMark {...props} />;
        case "underline":
            return <UnderlineMark {...props} />;
        case "comment":
            return (
                <span
                    {...props.attributes}
                    className={"prism-token token " + props.mark.type}
                    style={{ opacity: "0.33" }}
                >
                    {props.children}
                </span>
            );
        case "keyword":
            return (
                <span
                    {...props.attributes}
                    className={"prism-token token " + props.mark.type}
                    style={{ fontWeight: "bold" }}
                >
                    {props.children}
                </span>
            );
        case "tag":
            return (
                <span
                    {...props.attributes}
                    className={"prism-token token " + props.mark.type}
                    style={{ fontWeight: "bold" }}
                >
                    {props.children}
                </span>
            );
        case "punctuation":
            return (
                <span
                    {...props.attributes}
                    className={"prism-token token " + props.mark.type}
                    style={{ opacity: "0.75" }}
                >
                    {props.children}
                </span>
            );
        default:
            return next();
    }
};
