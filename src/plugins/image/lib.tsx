import { EditorBlock } from "draft-js";
import { insertImage } from "./insertImage";
import { PluginFunctions } from "@draft-js-plugins/editor";
import { InsertImageAttrs, StateTypes } from "./types";

const Caption = (props) => {
  return (
    <figcaption
      className="custom-block__caption"
      style={{ fontSize: "0.8rem" }}
    >
      <EditorBlock {...props} />
    </figcaption>
  );
};

const ImageBlock = (props) => {
  const imgSrc = props.block.get("data").get("src");
  const width = props.block.get("data").get("width");

  return (
    <div className="image-block">
      <figure>
        <img src={imgSrc} style={{ maxWidth: "100%", width }} />
        <Caption {...props} />
      </figure>
    </div>
  );
};

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
    insertImage: (props: InsertImageAttrs) => {
      if (store.getEditorState && store.setEditorState) {
        insertImage({
          ...props,
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
  const externalCallback = async (
    args: InsertImageAttrs | InsertImageAttrs[]
  ) => {
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
