import { EditorBlockTypes } from "@src/types";
import decorateComponentWithProps from "@utils/decorateComponentWithProps";
import { ContentBlock, EditorState } from "draft-js";
import Embedder from "./component";
import {
  addPlaceholder,
  removePlaceholder,
  setPlaceHolderWithError,
} from "./modifiers";
import PlaceholderButton from "./button";
import React from "react";

const defaultOptions = {
  placeholder: "Paste a link to embed content and press Enter",
  handleOnReturn: true,
  handleOnPaste: false,
  Component: React.Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEnter: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    block: ContentBlock,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    text: string
  ): Promise<EditorState | null> => {
    return null;
  },
};

export const createPlaceholderPlugin = ({
  options = {},
  theme = null,
  //   decorator = (component) => component,
  //   editable = false,
}) => {
  const pluginOptions = { ...defaultOptions, ...options };

  return {
    blockRendererFn: (
      block,
      { getEditorState, setEditorState, setReadOnly }
    ) => {
      if (block.getType() === EditorBlockTypes.Placeholder) {
        return {
          component: Embedder,
          editable: false,
          props: {
            placeholder: pluginOptions.placeholder,
            setReadOnly,
            theme,
            onCancel: (block: ContentBlock) => {
              setEditorState(
                removePlaceholder(getEditorState(), block.getKey())
              );
            },

            onEnter: async (block: ContentBlock, text: string) => {
              let editorState = await pluginOptions.onEnter(block, text);

              if (editorState) {
                editorState = removePlaceholder(
                  getEditorState(),
                  block.getKey()
                );
              } else if (text) {
                editorState = setPlaceHolderWithError(getEditorState(), block);
              }
              setEditorState(editorState);
            },
          },
        };
      }

      return null;
    },
    PlaceholderButton: decorateComponentWithProps(PlaceholderButton, {
      entityType: EditorBlockTypes.Placeholder,
      addPlaceholder,
    }),
  };
};
