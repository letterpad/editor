import { updateImageBlock, insertImage } from "./insertImage";
import { PluginFunctions } from "@draft-js-plugins/editor";
import { ImageData, StateTypes } from "./types";
import { ImageBlock } from "./component";

function blockRendererFn(block) {
  const type = block.getType();

  if (type === "atomic") {
    const blockType = block.get("data").get("type");
    if (blockType === "IMAGE") {
      return {
        component: ImageBlock,
        editable: true,
        props: {},
      };
    }
  }
}

export const createImagePlugin = () => {
  const store: StateTypes = {};

  return {
    blockRendererFn,
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
