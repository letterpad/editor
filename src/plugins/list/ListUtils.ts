import {
  hasBlock,
  hasParentOfType,
  getNodeOfType
  // getBlockParent
} from "../../helper/strategy";
import { Editor, Value, Text, Node, Path } from "slate";
const itemType = "li";

export const onTab = (event: KeyboardEvent, editor: Editor) => {
  event.preventDefault();
  if (event.shiftKey) return decreaseListDepthStrategy(editor);
  return increaseListDepthStrategy(editor);
};

export function isTextNode(node: Node): node is Text {
  return node.object === "text";
}

export const onBackspace = (_: any, editor: Editor, next: () => {}) => {
  const { value } = editor;
  const isList = hasBlock(value, itemType);
  if (!isList) return next();

  if (value.selection.start.offset === 0) {
    const node = getNodeOfType(value, itemType);
    if (!node) return;

    const currentUl = value.document.getParent(node.key);
    if (!currentUl) return next();
    if (isTextNode(currentUl)) return next();
    if (currentUl.type !== "ul") return next();

    const previousBlock = value.document.getPreviousNode(node.key);

    if (previousBlock && !isTextNode(previousBlock)) {
      // if it's a parent
      console.log(previousBlock.hasDescendant(node.key));

      if (previousBlock.hasDescendant(node.key)) {
        return decreaseListDepthStrategy(editor);
      }

      switch (previousBlock.type) {
        case "li":
          const previousUl = value.document.getParent(previousBlock.key);

          if (
            previousUl &&
            !isTextNode(previousUl) &&
            currentUl.type === "ul" &&
            previousUl.type === "ul"
          ) {
            if (currentUl === previousUl) {
              if (node.text) {
                editor.mergeNodeByKey(node.key);
              } else {
                editor.removeNodeByKey(node.key);
              }
            } else {
              editor.mergeNodeByKey(currentUl.key);
            }
          }
          return;
        case "paragraph":
          if (!previousBlock.text) {
            editor.removeNodeByKey(previousBlock.key);
          } else {
            deepRemoveList(editor);
          }
          return;
      }
    }
  }

  return next();
};

export const onEnter = (
  event: KeyboardEvent,
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
    .setBlocks("paragraph")
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
    .setBlocks("paragraph")
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

  for (let i = 0; i < depth; i++) {
    const parent: any = document.getParent(node.key);
    if (parent.type === "ul") removeUnorderedList(editor);
    else removeOrderedList(editor);
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

  if (isUnorderedList(value)) {
    const anchor = editor.value.anchorBlock;
    const previousLi = editor.value.document.getPreviousSibling(
      getPath(editor, anchor.key)
    );
    if (previousLi && !isTextNode(previousLi)) {
      const lastNode = previousLi.nodes.last();

      if (isTextNode(lastNode)) {
        editor = editor.wrapBlockByPath(getPath(editor, lastNode.key), "span");
      }

      return editor
        .moveNodeByPath(
          getPath(editor, editor.value.anchorBlock.key),
          getPath(editor, previousLi.key),
          previousLi.nodes.size
        )
        .wrapBlockByKey(editor.value.anchorBlock.key, "ul")
        .focus();
    } else {
      return editor.focus();
    }
  }

  if (isOrderedList(value)) return applyOrderedList(editor);
  return editor;
};

export const decreaseListDepthStrategy = (editor: Editor) => {
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

export function getPath(editor: Editor, key: string): Path {
  return editor.value.document.getPath(key);
}
