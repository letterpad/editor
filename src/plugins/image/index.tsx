import React from "react";
import {
  DefaultDraftBlockRenderMap,
  EditorState,
  EditorBlock,
  ContentBlock,
  genKey,
  ContentState,
} from "draft-js";
import { Map, List } from "immutable";
import { addNewBlockAt } from "../../utils/helper";

export const IMAGE_BLOCK = "IMAGE_BLOCK";

const Caption = props => {
  return (
    <figcaption
      className="custom-block__caption"
      style={{ fontSize: "0.8rem" }}
    >
      <EditorBlock {...props} />
    </figcaption>
  );
};

const ImageBlock = props => {
  const imgSrc = props.block.get("data").get("src");

  return (
    <div className="my-custom-block">
      <figure className="custom-block__image-wrap">
        <img src={imgSrc} className="custom-block__image" />
        <Caption {...props} />
      </figure>
    </div>
  );
};

function blockRendererFn(contentBlock) {
  const type = contentBlock.getType();

  if (type === IMAGE_BLOCK) {
    return {
      component: ImageBlock,
      props: {},
    };
  }
}

const ImageBlockMap = {
  [IMAGE_BLOCK]: {
    element: "div",
  },
};

const RenderMap = Map(ImageBlockMap);
RenderMap.merge(DefaultDraftBlockRenderMap);

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(RenderMap);

const insertImage = (editorState: EditorState, src: string) => {
  const selection = editorState.getSelection();

  const { newEditorState } = addNewBlockAt(
    editorState,
    selection.getAnchorKey(),
    IMAGE_BLOCK,
    Map({
      src,
    }),
  );

  return newEditorState;
};

const handleReturn = (
  e: React.SyntheticEvent,
  editorState: EditorState,
  { setEditorState },
) => {
  const selection = editorState.getSelection();

  // Check if the selection is collapsed
  if (selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getEndKey());
    const endOffset = selection.getEndOffset();
    const atEndOfBlock = endOffset === currentBlock.getLength();
    const atStartOfBlock = endOffset === 0;

    // Check we’re at the start/end of the current block
    if (
      atEndOfBlock ||
      atStartOfBlock ||
      (atStartOfBlock && !currentBlock.getLength())
    ) {
      const emptyBlockKey = genKey();
      const emptyBlock = new ContentBlock({
        key: emptyBlockKey,
        text: "",
        type: "unstyled",
        characterList: List(),
        depth: 0,
      });
      const blockMap = contentState.getBlockMap();
      // Split the blocks
      const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
        return v === currentBlock;
      });

      const blocksAfter = blockMap
        .toSeq()
        .skipUntil(function (v) {
          return v === currentBlock;
        })
        .rest();

      let augmentedBlocks;
      let focusKey;
      // Choose which order to apply the augmented blocks in depending
      // on whether we’re at the start or the end
      if (atEndOfBlock) {
        // Current first, empty block afterwards
        augmentedBlocks = [
          [currentBlock.getKey(), currentBlock],
          [emptyBlockKey, emptyBlock],
        ];

        focusKey = emptyBlockKey;
      } else {
        // Empty first, current block afterwards
        augmentedBlocks = [
          [emptyBlockKey, emptyBlock],
          [currentBlock.getKey(), currentBlock],
        ];
        focusKey = currentBlock.getKey();
      }
      // Join back together with the current + new block
      const newBlocks = blocksBefore
        .concat(augmentedBlocks, blocksAfter)
        .toOrderedMap();
      const newContentState = contentState.merge({
        blockMap: newBlocks,
        selectionBefore: selection,
        selectionAfter: selection.merge({
          anchorKey: focusKey,
          anchorOffset: 0,
          focusKey: focusKey,
          focusOffset: 0,
          isBackward: false,
        }),
      }) as ContentState;
      // Set the state
      setEditorState(
        EditorState.push(editorState, newContentState, "split-block"),
      );
      return "handled";
    }
  }
  return "not-handled";
};

export const createImagePlugin = () => {
  return {
    blockRendererFn,
    blockrenderMap: extendedBlockRenderMap,
    handleReturn: handleReturn,
  };
};

export const imageClicked = async (props: any, { getImageUrl }) => {
  const { getEditorState, setEditorState } = props;

  const url = await getImageUrl();
  if (!url) return;

  const newEditorState = insertImage(getEditorState(), url);
  setEditorState(newEditorState);
};
