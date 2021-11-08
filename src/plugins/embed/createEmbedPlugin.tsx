import { EditorBlockTypes } from "@src";
import { isBlockWithEntityType } from "@utils/helper";
import {
  ContentBlock,
  ContentState,
  EditorState,
  genKey,
  Modifier,
} from "draft-js";
import Embed from "./component";
import { addEmbed } from "./modifiers";
import { EmbedType } from "./types";
import { getEmbedType } from "./validate";
import theme from "./theme.module.css";
import decorateComponentWithProps from "@utils/decorateComponentWithProps";
import { List } from "immutable";

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
    // handleReturn: (e, state) => {
    //   e.preventDefault();

    //   // const currentContent = state.getCurrentContent();
    //   // const selection = state.getSelection();
    //   // const anchorKey = selection.getAnchorKey();
    //   // const blockMap = currentContent.getBlockMap();
    //   // const block = blockMap.get(anchorKey);

    //   const currentContent = state.getCurrentContent();
    //   const selection = state.getSelection();
    //   const textWithEntity = Modifier.splitBlock(currentContent, selection);

    //   store.setEditorState(
    //     EditorState.push(state, textWithEntity, "split-block")
    //   );
    // },
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
