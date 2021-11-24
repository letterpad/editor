import { EditorBlockTypes } from "@src/_types";
import { isBlockWithEntityType } from "@utils/helper";
import { ContentBlock, EditorState } from "draft-js";
import Embed from "./component";
import { addEmbed } from "./modifiers";
import { EmbedType } from "./types";
import { getEmbedType } from "./validate";
import theme from "./theme.module.css";
import decorateComponentWithProps from "@utils/decorateComponentWithProps";

const defaultOptions = { theme };

const createEmbedPlugin = ({ options = {}, decorator }) => {
  const pluginOptions = { ...defaultOptions, ...options };
  const store: any = {};
  const onPlaceholderEnter = async (state: EditorState, data) => {
    const embedData = getEmbedType(data.text);
    if (embedData.type === EmbedType.Unknown) return null;
    return addEmbed(state, embedData);
  };

  const Component = decorateComponentWithProps(decorator(Embed), {
    theme: pluginOptions.theme,
  });

  return {
    initialize: (helpers) => {
      store.setEditorState = helpers.setEditorState;
      store.getEditorState = helpers.getEditorState;
      if ("placeholderPlugin" in pluginOptions) {
        //@ts-ignore
        pluginOptions.placeholderPlugin.registerInputEnter(onPlaceholderEnter);
      }
    },
    blockRendererFn: (block: ContentBlock, { getEditorState }) => {
      if (
        isBlockWithEntityType(getEditorState(), block, EditorBlockTypes.Embed)
      ) {
        return {
          component: Component,
          editable: false,
          props: {
            ...getEmbedType(block.getData().get("src")),
          },
        };
      }
    },
  };
};
export default createEmbedPlugin;
