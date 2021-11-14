import React, { memo, useCallback, useRef } from "react";
import Editor, { EditorCommand } from "@draft-js-plugins/editor";
import { InlineToolbar } from "@plugins/inline-toolbar";
import { MobileToolbar } from "@plugins/mobile-toolbar";
import { Sidebar } from "@plugins/side-toolbar";
import { CompositeDecorator, EditorState, RichUtils } from "draft-js";
import withPlugins, { WithPluginProps } from "@plugins/withPlugins";
import { EditorProps } from "@src/types";
import { useStoreContext } from "@hooks/useStore";
import { onChangeAction } from "@store/actions";
import { extendedBlockRenderMap } from "@src/blockRenderMap";

import createPrismDecorator from "draft-js-prism-decorator";
import { linkDecorator } from "@src/decorators/link";

const prismDecorator = createPrismDecorator({
  getLanguage: () => "javascript",
});
const decorators = new CompositeDecorator([linkDecorator, prismDecorator]);

type Props = EditorProps & WithPluginProps;

const LetterpadEditor = (props: Props) => {
  const editorRef = useRef<Editor>(null);

  const { state, dispatch } = useStoreContext();
  const focusEditor = () => {
    getRef()?.current?.focus();
  };

  const getRef = () => {
    return props.editorRef || editorRef;
  };
  const onChange = useCallback(
    (newState: EditorState) => {
      dispatch(onChangeAction(newState, props.onChange));
    },
    [state]
  );

  const handleKeyCommand = useCallback(
    (command: EditorCommand, state: EditorState) => {
      const newState = RichUtils.handleKeyCommand(state, command);
      if (newState) {
        dispatch(onChangeAction(newState, props.onChange));
        return "handled";
      }
      return "not-handled";
    },
    []
  );

  const initPlugin = useCallback((helpers) => {
    if (props.setHelpers) {
      props.setHelpers({
        ...helpers,
        getPlugins: () => props.pluginsMap,
      });
    }
  }, []);

  return (
    <div className="editor" onClick={focusEditor}>
      <Editor
        editorState={state}
        onChange={onChange}
        plugins={[
          ...props.plugins,
          {
            initialize: initPlugin,
          },
        ]}
        handleKeyCommand={handleKeyCommand}
        ref={getRef()}
        blockRenderMap={extendedBlockRenderMap}
        placeholder={props.placeholder}
        decorators={[decorators]}
        customStyleMap={{
          CODE: {
            background: "var(--bg-highlight)",
            padding: "0 2px",
          },
        }}
      />

      <MobileToolbar />
      <InlineToolbar />
      <Sidebar plugins={props.pluginsMap} />

      <br />
      <br />
      <br />
    </div>
  );
};

export default memo(withPlugins(LetterpadEditor));
