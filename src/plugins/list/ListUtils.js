import { hasBlock } from "../../helper/strategy";

export const getBlockParent = (value, type) => {
    let parentNode = value.anchorBlock;
    do {
        if (parentNode.type === type) {
            return parentNode;
        }
    } while ((parentNode = value.document.getParent(parentNode.key)));
    return null;
};

export const onTab = (event, change) => {
    event.preventDefault();
    if (event.shiftKey) return decreaseListDepthStrategy(change);
    return increaseListDepthStrategy(change);
};

export const onBackspace = (event, editor, next) => {
    const { value } = editor;
    const isList = hasBlock(value, "list-item");
    if (!isList) return next();

    if (value.selection.start.offset === 0) {
        const node = getNodeOfType(value, "list-item");
        if (!node) return;
        const depth = value.document.getDepth(node.key);
        if (depth > 2) {
            return decreaseListDepthStrategy(editor);
        } else {
            editor.setBlocks("paragraph");
            if (getBlockParent(value, "unordered-list")) {
                return editor.unwrapBlock("unordered-list");
            } else if (getBlockParent(value, "ordered-list")) {
                return editor.unwrapBlock("ordered-list");
            }
        }
    }

    next();
};

export const onEnter = (event, editor, next) => {
    const { value } = editor;

    if (!hasBlock(value, "list-item")) return next();

    const { startText } = value;
    const isList = hasBlock(value, "list-item");

    if (isList) {
        event.preventDefault();
        if (startText.text === "") {
            deepRemoveList(editor).splitBlock();
            // return editor
            //     .splitBlock()
            //     .setBlocks("paragraph")
            //     .unwrapBlock("ordered-list")
            //     .unwrapBlock("unordered-list");
        } else {
            return editor.setBlocks("list-item");
        }
    }
    next();
};

//....................... refactor belows

export const isList = value =>
    value.blocks.some(block => block.type === "list-item");

export const hasParentOfType = (value, type) =>
    value.blocks.some(
        block =>
            !!value.document.getClosest(
                block.key,
                parent => parent.type === type
            )
    );
export const isUnorderedList = value =>
    hasParentOfType(value, "unordered-list");

export const isOrderedList = value => hasParentOfType(value, "ordered-list");

export const getNodeOfType = (value, type) =>
    value.blocks.filter(block => block.type === type).first();

export const getUnorderedListNode = value =>
    getNodeOfType(value, "unordered-list");

export const getOrderedListNode = value => getNodeOfType(value, "ordered-list");

export const removeUnorderedList = editor =>
    editor
        .setBlocks("paragraph")
        .unwrapBlock("unordered-list")
        .focus();

export const switchToOrderedList = editor =>
    editor
        .unwrapBlock("unordered-list")
        .wrapBlock("ordered-list")
        .focus();

export const removeOrderedList = editor =>
    editor
        .setBlocks("paragraph")
        .unwrapBlock("ordered-list")
        .focus();

export const switchToUnorderedList = editor =>
    editor
        .wrapBlock("unordered-list")
        .unwrapBlock("ordered-list")
        .focus();

export const applyList = (editor, type) =>
    editor
        .setBlocks("list-item")
        .wrapBlock(type)
        .focus();

export const onlyRemove = (change, type) => change.unwrapBlock(type).focus();
export const onlyRemoveUnorderedList = change =>
    onlyRemove(change, "unordered-list");
export const onlyRemoveOrderedList = change =>
    onlyRemove(change, "ordered-list");

export const applyUnorderedList = change => applyList(change, "unordered-list");
export const applyOrderedList = change => applyList(change, "ordered-list");

const deepRemoveList = editor => {
    const { value } = editor;
    const { document } = value;
    const node = getNodeOfType(value, "list-item");
    const depth = document.getDepth(node.key);

    Array(depth)
        .fill(".")
        .forEach(() => {
            const parent = document.getParent(node.key);
            if (parent.type === "unordered-list") removeUnorderedList(editor);
            else removeOrderedList(editor);
        });
    return editor;
};

export const unorderedListStrategy = editor => {
    const { value } = editor;
    if (!isList(value)) return applyList(editor, "unordered-list");

    if (isUnorderedList(value)) return deepRemoveList(editor);
    if (isOrderedList(value)) return switchToUnorderedList(editor);
    console.info("[SlateJS][ListPlugin] It is a different type of list.");
    return editor;
};

export const orderedListStrategy = editor => {
    const { value } = editor;
    // If it is not a list yet, transform it!
    if (!isList(value)) return applyList(editor, "ordered-list");

    // If it is already a list, handle it!
    if (isOrderedList(value)) return deepRemoveList(editor);
    else if (isUnorderedList(value)) return switchToOrderedList(editor);
    else console.info("[SlateJS][ListPlugin] It is a different type of list.");
    return editor;
};

export const increaseListDepthStrategy = editor => {
    const { value } = editor;
    // If it is not a list, kill the action immediately.
    if (!isList(value)) return editor;

    if (isUnorderedList(value)) return applyUnorderedList(editor);
    if (isOrderedList(value)) return applyOrderedList(editor);
    return editor;
};

export const decreaseListDepthStrategy = editor => {
    const { value } = editor;
    // If it is not a list, kill the action immediately.
    if (!isList(value)) return editor;

    const node = getNodeOfType(value, "list-item");
    const depth = value.document.getDepth(node.key);
    if (isUnorderedList(value) && depth > 2)
        return onlyRemoveUnorderedList(editor);
    if (isOrderedList(value) && depth > 2) return onlyRemoveOrderedList(editor);
    return editor;
};
