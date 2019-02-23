import { Editor, Value } from "slate";
import { isTextNode } from "../plugins/codeblock/CodeblockUtils";

export const applyMarkStrategy = (editor: Editor, type: string) =>
  editor.toggleMark(type).focus();

export const isMarkActive = (value: Value, type: string) => {
  return value.activeMarks.some(mark => mark != null && mark.type == type);
};

/**
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {String} type
 * @return {Boolean}
 */

export const hasBlock = (value: Value, type: string) => {
  return value.blocks.some(node => node != null && node.type == type);
};

export const hasParentOfType = (value: Value, type: string): boolean => {
  return value.blocks.some(
    block =>
      block != null &&
      !!value.document.getClosest(
        block.key,
        parent => !isTextNode(parent) && parent.type === type
      )
  );
};

export const getBlockParent = (value: Value, type: string) => {
  let parentNode = value.anchorBlock;
  do {
    if (parentNode.type === type) {
      return parentNode;
    }
  } while (((parentNode as any) = value.document.getParent(parentNode.key)));
  return null;
};

export const getNodeOfType = (value: Value, type: string) => {
  return value.blocks
    .filter(block => block != null && block.type === type)
    .first();
};
