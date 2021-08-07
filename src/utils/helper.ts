import {
  AtomicBlockUtils,
  CharacterMetadata,
  ContentBlock,
  ContentState,
  EditorState,
} from "draft-js";
import { List, Map,Repeat } from "immutable";

import generateRandomKey from "draft-js/lib/generateRandomKey";

export const _insertImage = (editorState: EditorState, src: string) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    "IMAGE",
    "IMMUTABLE",
    { src: src },
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
};

export const highlightCodeOnChange = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  const block = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
  if (block.getType() === "code-block") {
    const data = block.getData().merge({ language: "javascript" });
    const newBlock = block.merge({ data }) as ContentBlock;
    const newContentState = editorState.getCurrentContent().merge({
      blockMap: editorState
        .getCurrentContent()
        .getBlockMap()
        .set(selection.getStartKey(), newBlock),
      selectionAfter: selection,
    }) as ContentState;

    return EditorState.push(editorState, newContentState, "change-block-data");
  }
  return null;
};

export const addNewBlockAt = (
  editorState: EditorState,
  pivotBlockKey: string,
  text:string = "",
  initialData = Map({}),
) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const block = blockMap.get(pivotBlockKey);

  if (!block) {
    throw new Error(
      `The pivot key - ${pivotBlockKey} is not present in blockMap.`,
    );
  }

  const blocksBefore = blockMap.toSeq().takeUntil(v => v === block);
  const blocksAfter = blockMap
    .toSeq()
    .skipUntil(v => v === block)
    .rest();
  const newBlockKey = generateRandomKey();

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: "atomic",
    text: text || block.getText(),
      characterList: List(Repeat(CharacterMetadata.create(), text.length)),
    depth: 0,
    data: initialData,
  });
  
  const newBlockMap = blocksBefore
    .concat(
      [
        [pivotBlockKey, block],
        [newBlockKey, newBlock],
      ],
      blocksAfter,
    )
    .toOrderedMap();

  const selection = editorState.getSelection();

  const newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
    }),
  }) as ContentState;

  return {
    newEditorState: EditorState.push(editorState, newContent, "split-block"),
    addedBlockKey: newBlockKey,
  };
};
