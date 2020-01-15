import { Range, Editor, Point, Node, Text, Value } from "slate";
import { isMod } from "../../helper/keyboard-event";
import { getCodeBlockParent } from "../../helper/util";

export const applyCodeblock = (editor: Editor) => {
  const { value } = editor;
  const codeBlock = getCodeBlockParent(value, "pre");

  if (codeBlock) {
    const firstNode = codeBlock.nodes.get(0);
    if (isTextNode(firstNode)) return;
    const lastNode = codeBlock.nodes.get(codeBlock.nodes.size - 1);
    if (isTextNode(lastNode)) return;

    const startNode = firstNode.nodes.get(0);
    const endNode = lastNode.nodes.get(0);

    editor.select(
      Range.create({
        anchor: Point.create({
          key: startNode.key,
          path: [1],
          offset: 0
        }),
        focus: Point.create({
          key: endNode.key,
          path: [2],
          offset: codeBlock.text.length
        })
      })
    );

    return editor
      .removeMark("highlight")
      .unwrapBlockByKey(codeBlock.key, "pre")
      .focus();
  }

  return editor.wrapBlock("pre");
};

export function isTextNode(node: Node): node is Text {
  if (Object.prototype.hasOwnProperty.call(node, "nodes")) {
    return true;
  }
  return false;
}

export const unindentClosingBlocks = (change: Editor) => {
  const codeBlock = change.value.blocks.first();
  if (codeBlock != null && codeBlock.type !== "pre") {
    return;
  }
  const textAtCurrentLine = getTextAtCurrentLine(change.value);

  if (textAtCurrentLine.trim() === "") {
    change.deleteBackward(2);
  }
};

export const handleSelectAll = (
  event: React.KeyboardEvent<Element>,
  change: Editor
) => {
  if (!isMod(event)) return;

  if (change.value.blocks.first().type !== "pre") {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  return change.moveToEndOfBlock().moveFocusToStartOfBlock();
};

export const getTextAtCurrentLine = (value: Value) => {
  const textArr = value.anchorText.text.split(/\n/);
  // if the line is `abc` and if you press enter after `c`,
  // we are going to move back 1 space to get the offset
  const selection = window.getSelection();
  if (!selection) return "";
  const offset = selection.anchorOffset - 1;
  let startOffset = 1;
  let textAtCurrentLine = "";

  for (let i = 0; i < textArr.length; i++) {
    const text = textArr[i];
    startOffset = startOffset + text.length;
    textAtCurrentLine = text;
    if (startOffset > offset) {
      break;
    }
  }
  return textAtCurrentLine;
};

export const getAnchorOffsetAtCurrentLine = (value: Value) => {
  const textArr = value.anchorText.text.split(/\n/);
  const selection = window.getSelection();
  if (!selection) return 0;
  let offset = selection.anchorOffset;
  let startOffset = 0;

  for (let i = 0; i < textArr.length; i++) {
    const text = textArr[i];

    if (startOffset + text.length < offset) {
      startOffset = startOffset + text.length + 1; // + 1 is to account for new line
    } else {
      break;
    }
  }
  return offset - startOffset;
};
