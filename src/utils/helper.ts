import {
  AtomicBlockUtils,
  CharacterMetadata,
  ContentBlock,
  ContentState,
  EditorState,
} from "draft-js";
import { List, Map, Repeat } from "immutable";

import generateRandomKey from "draft-js/lib/generateRandomKey";
import { EditorBlockTypes } from "@src/types";

export const _insertImage = (editorState: EditorState, src: string) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    EditorBlockTypes.Image,
    "IMMUTABLE",
    { src }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
};

export const highlightCodeOnChange = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const startKey = selection.getStartKey();
  const block = content.getBlockForKey(startKey);
  if (block.getType() === "code-block" && !block.getData().get("language")) {
    // const nextContentState = Modifier.setBlockData(
    //   content,
    //   selection,
    //   Map({ language: "javascript" })
    // );
    const data = block.getData().merge({ language: "javascript" });
    const newBlock = block.merge({ data }) as ContentBlock;

    const newContent = {
      blockMap: content.getBlockMap().set(startKey, newBlock),
      selectionAfter: selection,
    };
    const nextContentState = content.merge(newContent) as ContentState;

    return EditorState.push(editorState, nextContentState, "change-block-data");
  }
  return editorState;
};

export const addNewBlockAt = (
  editorState: EditorState,
  pivotBlockKey: string,
  text = "",
  initialData = Map({})
) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const block = blockMap.get(pivotBlockKey);

  if (!block) {
    throw new Error(
      `The pivot key - ${pivotBlockKey} is not present in blockMap.`
    );
  }

  const blocksBefore = blockMap.toSeq().takeUntil((v) => v === block);
  const blocksAfter = blockMap
    .toSeq()
    .skipUntil((v) => v === block)
    .rest();
  const newBlockKey: string = generateRandomKey();

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: EditorBlockTypes.Atomic,
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
      blocksAfter
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

export const isBlockWithEntityType = (
  editorState: EditorState,
  block: ContentBlock,
  entityType: EditorBlockTypes
) => {
  if (block.getType() !== EditorBlockTypes.Atomic) {
    return false;
  }

  const contentState = editorState.getCurrentContent();
  const entityKey = block.getEntityAt(0);

  if (!entityKey) {
    return false;
  }

  const entity = contentState.getEntity(entityKey);

  return entity.getType() === entityType;
};

export const removeTagsFromPre = (data: string) => {
  const matchPre = /<pre\s*(.*)\>(.|\n)*?<\/pre>/gm;

  const newHtml = data
    .replace(matchPre, (match) => {
      const a =
        "<codeblock>" + match.replace(/<[^>]*>?/gm, "") + "</codeblock>";
      return a;
    })
    .replace(/<\/pre>/g, "")
    .replace(/<pre\s*(.*)\>/, "")
    .replace(/codeblock/g, "pre")
    .replace(/(<div)/gim, "<p")
    .replace(/<\/div>/gim, "</p>");

  return newHtml;
};

export const objectEqual = (obj1: object, obj2: object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return (
    keys1.length === keys2.length &&
    keys1.every((key) => obj1[key] === obj2[key])
  );
};
