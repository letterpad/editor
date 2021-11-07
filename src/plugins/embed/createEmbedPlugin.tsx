import { EditorBlockTypes } from "@src";
import { isBlockWithEntityType } from "@utils/helper";
import { ContentBlock, EditorState } from "draft-js";
import Embed from "./component";
import { addEmbed } from "./modifiers";
import { EmbedType } from "./types";
import { getEmbedType } from "./validate";
import theme from "./theme.module.css";
import decorateComponentWithProps from "@utils/decorateComponentWithProps";

const defaultOptions = { theme };

const createEmbedPlugin = ({ options = {} }) => {
  const pluginOptions = { ...defaultOptions, ...options };

  const onPlaceholderEnter = async (state: EditorState, data) => {
    const embedData = getEmbedType(data.text);
    if (embedData.type === EmbedType.Unknown) return null;
    return addEmbed(state, embedData);
  };

  return {
    initialize: () => {
      if ("placeholderPlugin" in pluginOptions) {
        //@ts-ignore
        pluginOptions.placeholderPlugin.registerInputEnter(onPlaceholderEnter);
      }
    },
    blockRendererFn: (block: ContentBlock, { getEditorState }) => {
      if (
        isBlockWithEntityType(getEditorState(), block, EditorBlockTypes.Embed)
      ) {
        console.log(pluginOptions.theme);
        return {
          component: decorateComponentWithProps(Embed, {
            theme: pluginOptions.theme,
          }),
          editable: false,
        };
      }
    },
  };
};
export default createEmbedPlugin;
