import { PluginFunctions } from "@draft-js-plugins/editor";
import { ImageData, StateTypes } from "./types";
import { ImageBlock } from "./component";
import { ContentBlock, EditorState } from "draft-js";
import { EditorBlockTypes } from "@src/_types";
import {
  moveFocusToNextBlock,
  insertImageInEditor,
  updateImageBlock,
  moveFocusToPreviousBlock,
} from "./modifiers";

export const createImagePlugin = ({ decorator }) => {
  const store: StateTypes = {};

  return {
    blockRendererFn: (block: ContentBlock) => {
      const type = block.getType();
      if (type === "atomic") {
        const blockType = block.get("data").get("type");
        if (blockType === EditorBlockTypes.Image) {
          return {
            component: decorator ? decorator(ImageBlock) : ImageBlock,
            editable: true,
            props: {},
          };
        }
      }
    },
    handleKeyCommand: (command, state: EditorState) => {
      if (command === "backspace") {
        const currentContent = state.getCurrentContent();
        const selection = state.getSelection();
        const anchorKey = selection.getAnchorKey();
        const blockMap = currentContent.getBlockMap();
        const block = blockMap.get(anchorKey);

        const previousBlock = currentContent.getBlockBefore(block.getKey());
        if (
          block.getText() === "" &&
          previousBlock?.getType() === "atomic" &&
          previousBlock.getData().get("type") === "image"
        ) {
          return moveFocusToPreviousBlock(state, store);
        }
      }

      return "not-handled";
    },
    handleReturn: (e, state: EditorState) => {
      e.preventDefault();
      return moveFocusToNextBlock(state, store);
    },
    insertImage: async (imgData: ImageData | ImageData[]) => {
      if (store.getEditorState && store.setEditorState) {
        return await insertImageInEditor(
          imgData,
          store.getEditorState,
          store.setEditorState
        );
      }
    },
    updateImageBlock: (blockKey: string, data: Partial<ImageData>) => {
      if (store.getEditorState && store.setEditorState) {
        updateImageBlock({
          blockKey,
          data,
          getState: store.getEditorState,
          setState: store.setEditorState,
        });
      }
    },
    initialize: (helpers: PluginFunctions) => {
      store.setEditorState = helpers.setEditorState;
      store.getEditorState = helpers.getEditorState;
    },
  };
};
