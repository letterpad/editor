import {
    hasBlock,
    hasParentOfType,
    getNodeOfType,
    getBlockParent
} from "../../helper/strategy";
const itemType = "li";

export const onTab = (event, change) => {
    event.preventDefault();
    if (event.shiftKey) return decreaseListDepthStrategy(change);
    return increaseListDepthStrategy(change);
};

export const onBackspace = (event, editor, next) => {
    const { value } = editor;
    const isList = hasBlock(value, itemType);
    if (!isList) return next();

    if (value.selection.start.offset === 0) {
        const node = getNodeOfType(value, itemType);
        if (!node) return;
        const depth = value.document.getDepth(node.key);
        if (depth > 2) {
            return decreaseListDepthStrategy(editor);
        } else {
            editor.setBlocks("paragraph");
            if (getBlockParent(value, "ul")) {
                return editor.unwrapBlock("ul");
            } else if (getBlockParent(value, "ol")) {
                return editor.unwrapBlock("ol");
            }
        }
    }

    next();
};

export const onEnter = (event, editor, next) => {
    const { value } = editor;
    const isList = hasBlock(value, itemType);
    const { startText } = value;

    if (!isList) return next();

    event.preventDefault();

    if (startText.text === "") {
        return deepRemoveList(editor);
    } else {
        editor.splitBlock().setBlocks(itemType);
    }
    return next();
};

// helper functions

export const isUnorderedList = value => {
    return hasParentOfType(value, "ul");
};

export const isOrderedList = value => {
    return hasParentOfType(value, "ol");
};

export const getUnorderedListNode = value => {
    return getNodeOfType(value, "ul");
};

export const getOrderedListNode = value => {
    return getNodeOfType(value, "ol");
};

export const removeUnorderedList = editor => {
    editor
        .setBlocks("paragraph")
        .unwrapBlock("ul")
        .focus();
};

export const switchToOrderedList = editor => {
    return editor
        .unwrapBlock("ul")
        .wrapBlock("ol")
        .focus();
};

export const removeOrderedList = editor => {
    return editor
        .setBlocks("paragraph")
        .unwrapBlock("ol")
        .focus();
};

export const switchToUnorderedList = editor => {
    return editor
        .wrapBlock("ul")
        .unwrapBlock("ol")
        .focus();
};

export const applyList = (editor, type) => {
    return editor
        .setBlocks(itemType)
        .wrapBlock(type)
        .focus();
};

export const onlyRemove = (editor, type) => {
    return editor.unwrapBlock(type).focus();
};

export const onlyRemoveUnorderedList = editor => {
    return onlyRemove(editor, "ul");
};

export const onlyRemoveOrderedList = editor => {
    return onlyRemove(editor, "ol");
};

export const applyUnorderedList = editor => {
    return applyList(editor, "ul");
};

export const applyOrderedList = editor => {
    return applyList(editor, "ol");
};

const deepRemoveList = editor => {
    const { value } = editor;
    const { document } = value;
    const node = getNodeOfType(value, itemType);
    const depth = document.getDepth(node.key);

    Array(depth)
        .fill(".")
        .forEach(() => {
            const parent = document.getParent(node.key);
            if (parent.type === "ul") removeUnorderedList(editor);
            else removeOrderedList(editor);
        });
    return editor;
};

export const unorderedListStrategy = editor => {
    const { value } = editor;
    if (!hasBlock(value, itemType)) return applyList(editor, "ul");

    if (isUnorderedList(value)) return deepRemoveList(editor);
    if (isOrderedList(value)) return switchToUnorderedList(editor);
    return editor;
};

export const orderedListStrategy = editor => {
    const { value } = editor;
    // If it is not a list yet, transform it!
    if (!hasBlock(value, itemType)) return applyList(editor, "ol");

    // If it is already a list, handle it!
    if (isOrderedList(value)) return deepRemoveList(editor);
    else if (isUnorderedList(value)) return switchToOrderedList(editor);
    return editor;
};

export const increaseListDepthStrategy = editor => {
    const { value } = editor;
    // If it is not a list, kill the action immediately.
    if (!hasBlock(value, itemType)) return editor;

    if (isUnorderedList(value)) return applyUnorderedList(editor);
    if (isOrderedList(value)) return applyOrderedList(editor);
    return editor;
};

export const decreaseListDepthStrategy = editor => {
    const { value } = editor;
    // If it is not a list, kill the action immediately.
    if (!hasBlock(value, itemType)) return editor;

    const node = getNodeOfType(value, itemType);
    const depth = value.document.getDepth(node.key);
    if (isUnorderedList(value) && depth > 2)
        return onlyRemoveUnorderedList(editor);
    if (isOrderedList(value) && depth > 2) return onlyRemoveOrderedList(editor);
    return editor;
};
