import Prism from "prismjs";
import { Block, Range, Value, Editor, Point, Node, Text } from "slate";
import { isMod } from "../../helper/keyboard-event";
import { Plugin } from "slate-react";

export const getCodeBlockParent = (value: Value) => {
  let parentNode = value.anchorBlock;
  do {
    if (parentNode.type === "pre") {
      return parentNode;
    }
  } while (((parentNode as any) = value.document.getParent(parentNode.key)));

  return null;
};

export const applyCodeblock = (editor: Editor) => {
  const { value } = editor;
  const codeBlock = getCodeBlockParent(value);

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
          path: 1,
          offset: 0
        }),
        focus: Point.create({
          key: endNode.key,
          path: 2,
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

export const decorateNode: Plugin["decorateNode"] = (
  document,
  editor,
  next
) => {
  const others: any[] = next() || [];
  if (isTextNode(document)) return others;
  const node = editor.value.anchorBlock;
  const { type } = node;
  if (type != "pre") return others;

  const language = node.data.get("language");

  const texts = node.getTexts().toArray();
  const string = texts.map(t => t.text).join("\n");
  const grammar = Prism.languages[language];

  const tokens = Prism.tokenize(string, grammar);
  const decorations = [];
  let startText = texts.shift();
  let endText = startText;
  let startOffset = 0;
  let endOffset = 0;
  let start = 0;

  for (const token of tokens) {
    startText = endText;
    startOffset = endOffset;
    if (startText == null) break;

    const content = getContent(token);
    const length = content.length;
    const end = start + length;

    let available = startText.text.length - startOffset;
    let remaining = length;

    endOffset = startOffset + remaining;
    while (available <= remaining && texts.length > 0) {
      endText = texts.shift();
      if (endText == null) break;

      remaining = length - available;
      available = endText.text.length;
      endOffset = remaining;
    }
    if (typeof token != "string" && endText != null) {
      const dec = {
        anchor: {
          key: startText.key,
          offset: startOffset
        },
        focus: {
          key: endText.key,
          offset: endOffset
        },
        mark: {
          type: token.type
        }
      };
      decorations.push(dec);
    }

    start = end;
  }

  return [...others, ...decorations];
};

// /**
//  * Return a decoration range for the given text.
//  */
// const createDecoration = ({
//     text,
//     textStart,
//     textEnd,
//     start,
//     end,
//     className
// }) => {
//     if (start >= textEnd || end <= textStart) {
//         // Ignore, the token is not in the text
//         return null;
//     }

//     // Shrink to this text boundaries
//     start = Math.max(start, textStart);
//     end = Math.min(end, textEnd);

//     // Now shift offsets to be relative to this text
//     start -= textStart;
//     end -= textStart;

//     return {
//         anchor: {
//             key: text.key,
//             path: [1],
//             offset: start
//         },
//         focus: {
//             key: text.key,
//             path: [2],
//             offset: text.text.length
//         }

//         // anchorKey: text.key,
//         // anchorOffset: start,
//         // focusKey: text.key,
//         // focusOffset: end,
//         // marks: [{ type: "prism-token", data: { className } }]
//     };
// };

export const insertNewLineBeforeCodeBlock = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);

  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;

  if (codeBlock.type !== "pre") return;

  // is it the first element in codeblock
  if (codeBlock.nodes.findIndex(node => node === anchor) !== 0) return;

  const parentContainer = change.value.document.getParent(codeBlock.key);
  if (parentContainer == null) return;
  if (isTextNode(parentContainer)) return;
  const index = parentContainer.nodes.findIndex(node => node === codeBlock);

  change.insertNodeByKey(
    parentContainer.key,
    index,
    Block.create({
      type: "paragraph"
    })
  );

  return true;
};

export const deleteNewLineBeforeCodeBlock = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);

  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;
  if (codeBlock.type !== "pre") return;

  // is it the first element in codeblock
  if (codeBlock.nodes.findIndex(node => node === anchor) !== 0) return;

  const parentContainer = change.value.document.getParent(codeBlock.key);
  if (parentContainer == null) return;
  if (isTextNode(parentContainer)) return;
  const index = parentContainer.nodes.findIndex(node => node === codeBlock);

  if (index === 0) {
    return applyCodeblock(change);

    // const targetNode = parentContainer.nodes.get(index);
    // change.removeNodeByKey(targetNode.key);
    // return true;
  }
};

export const preserveIndentationForCodeBlock = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = getCodeBlockParent(change.value);

  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;
  if (codeBlock.type !== "pre") return;

  const lines = anchor.text.split(/\r?\n/);
  const lastLine = lines[lines.length - 1];
  let nSpaces = lastLine.search(/\S|$/);

  if (
    lastLine.trim().endsWith("{") ||
    lastLine.trim().endsWith("(") ||
    lastLine.trim().endsWith("[")
  ) {
    nSpaces += 2;
  }

  change.insertText("\n" + " ".repeat(nSpaces));

  return true;
};

export const unindentClosingBlocks = (change: Editor) => {
  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);
  if (codeBlock != null && !isTextNode(codeBlock) && codeBlock.type !== "pre") {
    return;
  }

  const lines = anchor.text.split(/\r?\n/);
  const lastLine = lines[lines.length - 1];

  const nSpaces = lastLine.search(/\S|$/);
  if (nSpaces === lastLine.length) {
    change.deleteBackward(2);
    return true;
  }
};

export const isPrintableKeycode = (keycode: number) => {
  return (
    (keycode > 47 && keycode < 58) || // number keys
    keycode == 32 ||
    keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
    (keycode > 64 && keycode < 91) || // letter keys
    (keycode > 95 && keycode < 112) || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223)
  ); // [\]' (in order)
};

export const handleCommandAInCodeBlock = (event: Event, change: Editor) => {
  if (!isMod(event)) return;

  const anchor = change.value.anchorBlock;
  const codeBlock = change.value.document.getParent(anchor.key);
  if (codeBlock == null) return;
  if (isTextNode(codeBlock)) return;
  if (codeBlock.type !== "pre") {
    return;
  }

  const firstNode = codeBlock.nodes.get(0);
  if (isTextNode(firstNode)) return;
  const lastNode = codeBlock.nodes.get(codeBlock.nodes.size - 1);
  if (isTextNode(lastNode)) return;

  const startNode = firstNode.nodes.get(0);
  const endNode = lastNode.nodes.get(0);

  change.select(
    Range.create({
      anchor: startNode as any,
      focus: endNode as any
      // mark: { type: "pre" }
      // anchorKey: startNode.key,
      // anchorOffset: 0,
      // focusKey: lastNode.key,
      // focusOffset: codeBlock.text.length
    })
  );

  change.moveToRangeOf(codeBlock);
  change.focus();

  event.preventDefault();
  return true;
};

/**
 * A helper function to return the content of a Prism `token`.
 *
 * @param {Object} token
 * @return {String}
 */

function getContent(token: string | Prism.Token): string {
  if (typeof token == "string") {
    return token;
  } else if (typeof token.content == "string") {
    return token.content;
  } else if (Array.isArray(token.content)) {
    return token.content.map(getContent).join("");
  } else {
    return getContent(token);
  }
}

// /**
//  * Return a decoration range for the given text.
//  */
// function createDecoration({
//   text,
//   textStart,
//   textEnd,
//   start,
//   end,
//   className
// }: {
//   text: Text; // The text being decorated
//   textStart: number; // Its start position in the whole text
//   textEnd: number; // Its end position in the whole text
//   start: number; // The position in the whole text where the token starts
//   end: number; // The position in the whole text where the token ends
//   className: string; // The prism token classname
// }) {
//   if (start >= textEnd || end <= textStart) {
//     // Ignore, the token is not in the text
//     return null;
//   }

//   // Shrink to this text boundaries
//   start = Math.max(start, textStart);
//   end = Math.min(end, textEnd);

//   // Now shift offsets to be relative to this text
//   start -= textStart;
//   end -= textStart;

//   return {
//     anchor: {
//       key: text.key,
//       offset: start,
//       path: []
//     },
//     focus: {
//       key: text.key,
//       offset: end,
//       path: []
//     },
//     marks: [{ type: "prism-token", data: { className } }]
//   };
// }
