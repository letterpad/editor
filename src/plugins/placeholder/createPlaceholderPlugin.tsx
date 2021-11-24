import { EditorBlockTypes } from "@src/_types";
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

type Callback = (
  block: ContentBlock,
  data: { [key: string]: unknown }
) => Promise<EditorState | null>;

const defaultOptions = {
  placeholder: "Paste a link to embed content and press Enter",
  handleOnReturn: true,
  handleOnPaste: false,
  Component: React.Component,
};

export const createPlaceholderPlugin = ({
  options = {},
  theme = null,
  //   decorator = (component) => component,
  //   editable = false,
}) => {
  const pluginOptions = { ...defaultOptions, ...options };
  const callbacks = {
    enterCallback: async (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      block: ContentBlock,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: { [key: string]: unknown }
    ): Promise<EditorState | null> => {
      return null;
    },
  };

  const registerInputEnter = (callback: Callback) => {
    callbacks.enterCallback = callback;
  };

  return {
    blockRendererFn: (
      block: ContentBlock,
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
              let editorState = await callbacks.enterCallback(
                getEditorState(),
                { text }
              );
              if (editorState) {
                editorState = removePlaceholder(editorState, block.getKey());
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
    registerInputEnter,
  };
};
