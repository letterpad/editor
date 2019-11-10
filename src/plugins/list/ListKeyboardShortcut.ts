import { onEnter } from "./ListUtils";
import { Editor, Path, Text, Node, Block, Inline, Document } from "slate";

const ListKeyboardShortcut = (
  event: React.KeyboardEvent<Element>,
  editor: Editor,
  next: () => any
) => {
  switch (event.key) {
    case "Backspace":
      return onBackspace(event, editor, next);
    case "Enter": {
      return onEnter(event, editor, next);
    }
  }

  next();
};

function onBackspace(
  _: React.KeyboardEvent<Element>,
  editor: Editor,
  next: () => any
) {
  const { value } = editor;
  if (value.anchorBlock.type !== "li") return next();

  const li = value.anchorBlock;
  const path = getPath(editor, li.key);
  if (value.selection.start.offset === 0 && path) {
    const list = value.document.getParent(path);
    if (list == null || isTextNode(list) || !isList(list)) {
      return next();
    }

    // first node
    if (li.key === list.nodes.first().key) {
      // try merging if previous ul exists
      const prevBlock = value.document.getPreviousSibling(list.key);
      if (prevBlock == null || isTextNode(prevBlock)) {
        return next();
      }

      if (prevBlock.type === list.type) {
        editor.mergeNodeByKey(list.key);
        // nothing more to do
        return;
      }

      if (!prevBlock.text) {
        editor.removeNodeByKey(prevBlock.key);
        return;
      }

      if (!li.text) {
        editor
          .removeNodeByKey(li.key)
          .moveAnchorToStartOfNextBlock()
          .moveFocusToStartOfNextBlock();
        return;
      }

      return next();
    }

    const prevLi = value.document.getPreviousBlock(li.key);
    if (prevLi == null || prevLi.type !== "li") {
      return next();
    }

    if (prevLi.nodes.isEmpty()) {
      editor.mergeNodeByKey(prevLi.key);
      return;
    }
  }

  return next();
}

function getPath(editor: Editor, key: string): Path | null {
  return editor.value.document.getPath(key);
}

function isTextNode(node: Node): node is Text {
  return node.object === "text";
}

function isList(node: Document | Block | Inline) {
  return ["ul", "ol"].includes(node.type);
}

export default ListKeyboardShortcut;
