import { Block } from "slate";

export default {
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
