import { updateImageBlock, insertImage } from "./insertImage";
import { PluginFunctions } from "@draft-js-plugins/editor";
import { ImageData, StateTypes } from "./types";
import { ImageBlock } from "./component";
import { ContentBlock, EditorState, SelectionState } from "draft-js";
import { EditorBlockTypes } from "@src/types";

function blockRendererFn(block: ContentBlock, decorator) {
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
}

export const createImagePlugin = ({ decorator }) => {
  const store: StateTypes = {};

  return {
    blockRendererFn: (block: ContentBlock) => blockRendererFn(block, decorator),
    handleReturn: (e, state: EditorState) => {
      e.preventDefault();

      const currentContent = state.getCurrentContent();
      const selection = state.getSelection();
      const anchorKey = selection.getAnchorKey();
      const blockMap = currentContent.getBlockMap();
      const block = blockMap.get(anchorKey);

      if (block.getType() !== "atomic") return "not-handled";

      const nextBlock = currentContent.getBlockAfter(block.getKey());

      const newSelection = new SelectionState({
        anchorKey: nextBlock?.getKey(),
        anchorOffset: 0,
        focusKey: nextBlock?.getKey(),
        focusOffset: 0,
      });

      const newEditorState = EditorState.forceSelection(state, newSelection);

      if (store.setEditorState) {
        store.setEditorState(newEditorState);
        return "handled";
      }
      return "not-handled";
    },
    insertImage: (props: ImageData) => {
      if (store.getEditorState && store.setEditorState) {
        return insertImage({
          ...props,
          getState: store.getEditorState,
          setState: store.setEditorState,
        });
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

export const imageClicked = async (
  props: Required<StateTypes>,
  { getImageUrl }
) => {
  const { getEditorState, setEditorState } = props;
  const externalCallback = async (args: ImageData | ImageData[]) => {
    if (!Array.isArray(args)) {
      args = [args];
    }
    for (let i = 0; i < args.length; i++) {
      await insertImage({
        ...args[i],
        getState: getEditorState,
        setState: setEditorState,
      });
    }
  };
  getImageUrl(externalCallback);
};
