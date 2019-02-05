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
