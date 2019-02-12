import { pluginConfigs } from "../plugins";

export const BLOCK_TAGS = {
    // blockquote: "block-quote",
    p: "paragraph"
    // pre: "code_block",
    // h1: "heading-one",
    // h2: "heading-two",
    // h3: "heading-three",
    // h4: "heading-four",
    // h5: "heading-five",
    // h6: "heading-six",
    // hr: "line-break",
    // ol: "ordered-list",
    // ul: "unordered-list",
    // li: "list-item"
};

export const MARK_TAGS = {
    // em: "italic",
    // strong: "bold",
    // u: "underline",
    // code: "highlight"
};

export const INLINE_TAGS = {
    // a: "link",
    // img: "image"
};

pluginConfigs.filter(config => {
    if (!Array.isArray(config)) {
        config = [config];
    }
    config.forEach(plugin => {
        // node or mark
        let { type, identifier } = config;
        if (!identifier) {
            return false;
        }
        identifier.forEach(set => {
            if (set[0] === "span") return;
            if (type === "block") {
                BLOCK_TAGS[set[0]] = set[1];
            }
            if (type === "mark") {
                MARK_TAGS[set[0]] = set[1];
            }
            if (type === "inline") {
                INLINE_TAGS[set[0]] = set[1];
            }
        });
    });
});
