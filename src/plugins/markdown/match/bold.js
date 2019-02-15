import { Mark, Range } from "slate";

import trailingSpace from "../utils/trailingSpace";
import removeAllMark from "../utils/mark-removal";

export default (type, currentTextNode, matched, editor) => {
    const matchedLength = matched[0].length;
    const reg = matched[1] === "**" ? /\*\*/ : matched[1];
    const addText = matched[0].replace(new RegExp(reg, "g"), "");
    return editor
        .deleteAtRange(
            Range.create({
                anchor: {
                    key: currentTextNode.key,
                    path: [],
                    offset: matched.index
                },
                focus: {
                    key: currentTextNode.key,
                    path: [],
                    offset: matched.index + matchedLength
                }
            })
        )
        .insertTextByKey(currentTextNode.key, matched.index, addText, [
            Mark.create({ type })
        ])
        .call(trailingSpace, currentTextNode, matched.index)
        .call(removeAllMark);
};
