import {
  hasBlock,
  hasParentOfType,
  getNodeOfType
  // getBlockParent
} from "../../helper/strategy";
import { Editor, Value } from "slate";
const itemType = "li";

export const onTab = (event: KeyboardEvent, editor: Editor) => {
  event.preventDefault();
  if (event.shiftKey) return decreaseListDepthStrategy(editor);
  return increaseListDepthStrategy(editor);
};

export const onBackspace = (_: any, editor: Editor, next: () => {}) => {
  const { value } = editor;
  const isList = hasBlock(value, itemType);
  if (!isList) return next();

  if (value.selection.start.offset === 0) {
    const node = getNodeOfType(value, itemType);
    if (!node) return;
    deepRemoveList(editor);
  }

  next();
};

export const onEnter = (
  event: React.KeyboardEvent<Element>,
  editor: Editor,
  next: () => {}
) => {
  const { value } = editor;
  const isList = hasBlock(value, itemType);
  const { startText } = value;

  if (!isList) return next();

  event.preventDefault();

  const emptyText = startText.text === "";

  return emptyText ? deepRemoveList(editor) : editor.splitBlock(1);
};

// helper functions

export const isUnorderedList = (value: Value) => {
  return hasParentOfType(value, "ul");
};

export const isOrderedList = (value: Value) => {
  return hasParentOfType(value, "ol");
};

export const getUnorderedListNode = (value: Value) => {
  return getNodeOfType(value, "ul");
};

export const getOrderedListNode = (value: Value) => {
  return getNodeOfType(value, "ol");
};

export const removeUnorderedList = (editor: Editor) => {
  editor
    .setBlocks("p")
    .unwrapBlock("ul")
    .focus();
};

export const switchToOrderedList = (editor: Editor) => {
  return editor
    .unwrapBlock("ul")
    .wrapBlock("ol")
    .focus();
};

export const removeOrderedList = (editor: Editor) => {
  return editor
    .setBlocks("p")
    .unwrapBlock("ol")
    .focus();
};

export const switchToUnorderedList = (editor: Editor) => {
  return editor
    .wrapBlock("ul")
    .unwrapBlock("ol")
    .focus();
};

export const applyList = (editor: Editor, type: string) => {
  return editor
    .setBlocks(itemType)
    .wrapBlock(type)
    .focus();
};

export const onlyRemove = (editor: Editor, type: string) => {
  return editor.unwrapBlock(type).focus();
};

export const onlyRemoveUnorderedList = (editor: Editor) => {
  return onlyRemove(editor, "ul");
};

export const onlyRemoveOrderedList = (editor: Editor) => {
  return onlyRemove(editor, "ol");
};

export const applyUnorderedList = (editor: Editor) => {
  return applyList(editor, "ul");
};

export const applyOrderedList = (editor: Editor) => {
  return applyList(editor, "ol");
};

const deepRemoveList = (editor: Editor) => {
  const { value } = editor;
  const { document } = value;
  const node = getNodeOfType(value, itemType);
  const depth = document.getDepth(node.key);
  if (depth) {
    for (let i = 0; i < depth; i++) {
      const parent: any = document.getParent(node.key);
      if (parent.type === "ul") removeUnorderedList(editor);
      else removeOrderedList(editor);
    }
  }
  return editor;
};

export const unorderedListStrategy = (editor: Editor) => {
  const { value } = editor;
  if (!hasBlock(value, itemType)) return applyList(editor, "ul");

  if (isUnorderedList(value)) return deepRemoveList(editor);
  if (isOrderedList(value)) return switchToUnorderedList(editor);
  return editor;
};

export const orderedListStrategy = (editor: Editor) => {
  const { value } = editor;
  // If it is not a list yet, transform it!
  if (!hasBlock(value, itemType)) return applyList(editor, "ol");

  // If it is already a list, handle it!
  if (isOrderedList(value)) return deepRemoveList(editor);
  else if (isUnorderedList(value)) return switchToOrderedList(editor);
  return editor;
};

export const increaseListDepthStrategy = (editor: Editor) => {
  const { value } = editor;
  // If it is not a list, kill the action immediately.
  if (!hasBlock(value, itemType)) return editor;

  if (isUnorderedList(value)) return applyUnorderedList(editor);
  if (isOrderedList(value)) return applyOrderedList(editor);
  return editor;
};

export const decreaseListDepthStrategy = (editor: Editor) => {
  const { value } = editor;
  // If it is not a list, kill the action immediately.
  if (!hasBlock(value, itemType)) return editor;

  const node = getNodeOfType(value, itemType);
  const depth = value.document.getDepth(node.key);
  if (depth) {
    if (isUnorderedList(value) && depth > 2)
      return onlyRemoveUnorderedList(editor);
    if (isOrderedList(value) && depth > 2) return onlyRemoveOrderedList(editor);
  }
  return editor;
};
