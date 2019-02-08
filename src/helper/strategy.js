export const applyMarkStrategy = (editor, type) =>
    editor.toggleMark(type).focus();

export const isMarkActive = (value, type) => {
    return value.activeMarks.some(mark => mark.type == type);
};

/**
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {String} type
 * @return {Boolean}
 */

export const hasBlock = (value, type) => {
    return value.blocks.some(node => node.type == type);
};

export const hasParentOfType = (value, type) => {
    return value.blocks.some(
        block =>
            !!value.document.getClosest(
                block.key,
                parent => parent.type === type
            )
    );
};
export const getBlockParent = (value, type) => {
    let parentNode = value.anchorBlock;
    do {
        if (parentNode.type === type) {
            return parentNode;
        }
    } while ((parentNode = value.document.getParent(parentNode.key)));
    return null;
};
export const getNodeOfType = (value, type) => {
    return value.blocks.filter(block => block.type === type).first();
};
