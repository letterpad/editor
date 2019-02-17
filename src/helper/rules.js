import React from "react";
import Prism from "prismjs";
import { getAllTags } from "./constants";
import { LinkNode } from "../plugins/link";
import { renderNode, renderMark } from "./renderer";
import { ImageNode } from "../plugins/image";

export default [
    {
        deserialize(el, next) {
            const type = getAllTags().BLOCK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: "block",
                    type: type,
                    data: {
                        className: el.getAttribute("class"),
                        src: el.getAttribute("src") || null,
                        href: el.getAttribute("href") || null,
                        language: el.getAttribute("data-language") || null
                    },
                    nodes: next(el.childNodes)
                };
            }
        },
        serialize(obj, children) {
            if (obj.object == "block") {
                const props = { children, node: obj };
                if (obj.type == "paragraph") {
                    return <p>{props.children}</p>;
                } else if (obj.type === "code_block") {
                    const html = Prism.highlight(
                        obj.text,
                        Prism.languages.javascript,
                        "javascript"
                    );
                    return (
                        <pre
                            className="prism-dark"
                            data-language={obj.data.get("language")}
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    );
                }
                return renderNode(obj.type, props);
            }
        }
    },
    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            const type = getAllTags().MARK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: "mark",
                    type: type,
                    nodes: next(el.childNodes)
                };
            }
        },
        serialize(obj, children) {
            if (obj.object === "mark") {
                const props = { children };
                return renderMark(obj.type, props);
            }
        }
    },
    {
        deserialize: (el, next) => {
            // if (!el.tagName) return;
            const type = getAllTags().INLINE_TAGS[el.tagName.toLowerCase()];

            if (type) {
                return {
                    object: "inline",
                    type,
                    isVoid: el.tagName.toLowerCase() === "img",
                    nodes: next(el.childNodes),
                    data: {
                        href: el.getAttribute("href"),
                        src: el.getAttribute("src")
                    }
                };
            }
        },
        serialize: (obj, children) => {
            if (obj.object !== "inline") {
                return;
            }
            const type = getAllTags().INLINE_TAGS[el.tagName.toLowerCase()];
            const props = { children, node: obj };

            switch (obj.type) {
                case "a":
                    return <LinkNode {...props} />;
                case "img":
                    return <ImageNode {...props} />;
            }
        }
    },
    {
        // Special case for code blocks, which need to grab the nested childNodes.
        deserialize(el, next) {
            if (el.tagName.toLowerCase() == "pre") {
                const code = el.childNodes[0];
                const childNodes =
                    code && code.tagName.toLowerCase() == "code"
                        ? code.childNodes
                        : el.childNodes;

                return {
                    object: "block",
                    type: "code",
                    nodes: next(childNodes)
                };
            }
        }
    }
];
