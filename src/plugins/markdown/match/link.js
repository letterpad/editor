import { Range } from "slate";
import trailingSpace from "../utils/trailingSpace";

export default (type, currentTextNode, matched, change) => {
  const matchedLength = matched[0].length;

  return change
    .deleteAtRange(
      Range.create({
        anchorKey: currentTextNode.key,
        focusKey: currentTextNode.key,
        anchorOffset: matched.index,
        focusOffset: matched.index + matchedLength
      })
    )
    .command(trailingSpace, currentTextNode, matched.index)
    .insertText(matched[1])
    .extend(0 - matched[1].length)
    .wrapInline({
      type,
      data: { href: matched[2] }
    })
    .collapseToEnd()
    .command(trailingSpace, currentTextNode, matched.index);
};
