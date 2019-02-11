import React from "react";
import classnames from "classnames";
import { applyHeadings } from "./HeadingsUtils";
import { hasBlock } from "../../helper/strategy";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const HeadingsButton = ({ editor, style, type }) => {
    if (!editor) return <span />;
    return (
        <span
            style={style}
            className={classnames("button", {
                active: hasBlock(editor.value, type)
            })}
            type={type}
            onMouseDown={e => {
                e.preventDefault();
                // check if this is already active
                const isActive = hasBlock(editor.value, type);
                return applyHeadings(
                    editor,
                    isActive ? "paragraph" : type
                );
            }}
        >
            <span className="material-icons">{getType(type)}</span>
        </span>
    );
};

const getType = type => {
    switch (type) {
        case "heading-one":
            return "looks_one";
        case "heading-two":
            return "looks_two";
        case "heading-three":
            return "looks_3";
        case "heading-four":
            return "looks_4";
        case "heading-five":
            return "looks_5";
        case "heading-six":
            return "looks_6";

        default:
            break;
    }
};
export default HeadingsButton;
