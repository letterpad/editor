import React, { useEffect, useRef } from "react";
import Editor, { EditorCommand } from "@draft-js-plugins/editor";
import { InlineToolbar } from "../plugins/inline-toolbar";
import { MobileToolbar } from "../plugins/mobile-toolbar";
import { Sidebar } from "../plugins/side-toolbar";
import { EditorState, RichUtils } from "draft-js";
import withPlugins, { WithPluginProps } from "../plugins/withPlugins";
import { EditorProps, PluginHelpers } from "../types";
import { useStoreContext } from "../hooks/useStore";
import { highlightCodeAction, onChangeAction } from "../store/actions";
import { extendedBlockRenderMap } from "../blockRenderMap";

type Props = EditorProps & WithPluginProps & PluginHelpers;

const LetterpadEditor = (props: Props) => {
  const editorRef = useRef<Editor>(null);

  const { state, dispatch } = useStoreContext();

  useEffect(() => {
    dispatch(highlightCodeAction(state));
  }, [state]);

  const focusEditor = () => {
    getRef()?.current?.focus();
  };

  const getRef = () => {
    return props.editorRef || editorRef;
  };

  const onChange = (newState: EditorState) => {
    dispatch(onChangeAction(newState, props.onChange));
  };

  const handleKeyCommand = (command: EditorCommand, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      dispatch(onChangeAction(newState, props.onChange));
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className="editor" onClick={focusEditor}>
      <Editor
        editorState={state}
        onChange={onChange}
        plugins={[
          ...props.plugins,
          {
            initialize: (helpers) => {
              if (props.setHelpers) {
                props.setHelpers({
                  ...helpers,
                  pluginHelpers: props.pluginHelpers,
                });
              }
            },
          },
        ]}
        handleKeyCommand={handleKeyCommand}
        ref={getRef()}
        blockRenderMap={extendedBlockRenderMap}
        placeholder={props.placeholder}
      />

      <MobileToolbar />
      <InlineToolbar />
      <Sidebar />

      <br />
      <br />
      <br />
    </div>
  );
};

export default withPlugins(LetterpadEditor);
