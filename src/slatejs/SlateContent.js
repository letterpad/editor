import React from "react";
import classnames from "classnames";
import { Editor } from "slate-react";
import { Block } from "slate";
import { LAST_CHILD_TYPE_INVALID } from "slate-schema-violations";

import { decorateNode } from "../plugins/codeblock/CodeblockUtils";
import { nodeRenderer, markRenderer } from "../helper/renderer";

/* eslint-disable default-case */
export const renderNode = (props, editor, next) => {
    return nodeRenderer(props.node.type, props, next);
};

export const renderMark = (props, editor, next) => {
    return markRenderer(props.mark.type, props, next);
};

/**
 * A schema to enforce that there's always a paragraph as the last block.
 * @type {Object}
 */

const schema = {
    document: {
        last: { types: ["paragraph"] },
        normalize: (editor, { code, child, node }) => {
            switch (code) {
                case LAST_CHILD_TYPE_INVALID: {
                    const paragraph = Block.create("paragraph");
                    return editor.insertNodeByKey(
                        node.key,
                        node.nodes.size,
                        paragraph
                    );
                }
            }
        }
    }
};

/* eslint-disable react/prop-types */

export default ({
    className,
    wrapperStyle,
    style,
    value,
    plugins,
    onChange,
    children,
    onPaste,
    editor,
    ...rest
}) => {
    return (
        <div
            className={classnames("editor--content", className)}
            style={wrapperStyle}
        >
            <Editor
                schema={schema}
                plugins={plugins}
                defaultValue={value}
                onChange={onChange}
                onPaste={onPaste}
                style={style}
                ref={editor}
                renderNode={renderNode}
                renderMark={renderMark}
                decorateNode={decorateNode}
                placeholder="Compose a story.."
                {...rest}
            />
            {children}
        </div>
    );
};
