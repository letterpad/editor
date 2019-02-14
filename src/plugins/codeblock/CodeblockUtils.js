import Prism from "prismjs";
import { Block, Range } from "slate";
import { isMod } from "../../helper/keyboard-event";

export const getCodeBlockParent = value => {
    let parentNode = value.anchorBlock;
    do {
        if (parentNode.type === "code_block") {
            return parentNode;
        }
    } while ((parentNode = value.document.getParent(parentNode.key)));
    return null;
};

export const applyCodeblock = editor => {
    const { value } = editor;
    const codeBlock = getCodeBlockParent(value);

    if (codeBlock) {
        const startNode = codeBlock.nodes.get(0).nodes.get(0);
        const lastNode = codeBlock.nodes
            .get(codeBlock.nodes.size - 1)
            .nodes.get(0);

        editor.select(
            Range.create({
                anchor: {
                    key: startNode.key,
                    path: [1],
                    offset: 0
                },
                focus: {
                    key: lastNode.key,
                    path: [2],
                    offset: codeBlock.text.length
                }
            })
        );

        return editor
            .removeMark("highlight")
            .unwrapBlockByKey(codeBlock.key, "code_block")
            .focus();
    }

    return editor.wrapBlock("code_block");
};

export const decorateNode = (node, editor, next) => {
    const others = next() || [];
    const block = node.nodes.get(0);
    const { type } = block;
    if (type != "code_block") return others;

    const language = block.data.get("language") || "javascript";
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

        const content = getContent(token);
        const newlines = content.split("\n").length - 1;
        const length = content.length - newlines;
        const end = start + length;

        let available = startText.text.length - startOffset;
        let remaining = length;

        endOffset = startOffset + remaining;

        while (available < remaining && texts.length > 0) {
            endText = texts.shift();
            remaining = length - available;
            available = endText.text.length;
            endOffset = remaining;
        }

        if (typeof token != "string") {
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

export const insertNewLineBeforeCodeBlock = change => {
    const anchor = change.value.anchorBlock;
    const codeBlock = change.value.document.getParent(anchor.key);

    if (codeBlock.type !== "code_block") return;

    // is it the first element in codeblock
    if (codeBlock.nodes.findIndex(node => node === anchor) !== 0) return;

    const parentContainer = change.value.document.getParent(codeBlock.key);
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

export const deleteNewLineBeforeCodeBlock = change => {
    const anchor = change.value.anchorBlock;
    const codeBlock = change.value.document.getParent(anchor.key);

    if (codeBlock.type !== "code_block") return;

    // is it the first element in codeblock
    if (codeBlock.nodes.findIndex(node => node === anchor) !== 0) return;

    const parentContainer = change.value.document.getParent(codeBlock.key);
    const index = parentContainer.nodes.findIndex(node => node === codeBlock);

    if (index === 0) {
        return applyCodeblock(change);

        // const targetNode = parentContainer.nodes.get(index);
        // change.removeNodeByKey(targetNode.key);
        // return true;
    }
};

export const preserveIndentationForCodeBlock = change => {
    const anchor = change.value.anchorBlock;
    const codeBlock = getCodeBlockParent(change.value);

    if (codeBlock.type !== "code_block") return;

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

export const unindentClosingBlocks = change => {
    const anchor = change.value.anchorBlock;
    const codeBlock = change.value.document.getParent(anchor.key);
    if (codeBlock.type !== "code_block") return;

    const lines = anchor.text.split(/\r?\n/);
    const lastLine = lines[lines.length - 1];

    const nSpaces = lastLine.search(/\S|$/);
    if (nSpaces === lastLine.length) {
        change.deleteBackward(2);
        return true;
    }
};

export const isPrintableKeycode = keycode => {
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

export const handleCommandAInCodeBlock = (event, change) => {
    if (!isMod(event)) return;

    const anchor = change.value.anchorBlock;
    const codeBlock = change.value.document.getParent(anchor.key);
    if (codeBlock.type !== "code_block") return;

    const startNode = codeBlock.nodes.get(0).nodes.get(0);
    const lastNode = codeBlock.nodes.get(codeBlock.nodes.size - 1).nodes.get(0);

    change.select(
        Range.create({
            anchor: startNode,
            focus: lastNode,
            mark: { type: "code_block" }
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

function getContent(token) {
    if (typeof token == "string") {
        return token;
    } else if (typeof token.content == "string") {
        return token.content;
    } else {
        return token.content.map(getContent).join("");
    }
}
