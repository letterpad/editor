import { pluginConfigs } from "../plugins";

export const BLOCK_TAGS = {
    p: "paragraph"
};

export const MARK_TAGS = {};

export const INLINE_TAGS = {};

export const getAllTags = () => {
    return { BLOCK_TAGS, MARK_TAGS, INLINE_TAGS };
};

pluginConfigs.filter(config => {
    if (!Array.isArray(config)) {
        config = [config];
    }
    config.forEach(plugin => {
        // node or mark
        config.forEach(plugin => {
            let { type, identifier } = plugin;
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
});
