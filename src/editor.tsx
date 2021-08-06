import React, {useEffect, useRef, useState} from "react";
import Editor, {
  EditorCommand,
} from "@draft-js-plugins/editor";

import {plugins} from "./plugins";
import InlineToolbar from "./plugins/inline-toolbar/inlineToolbar";
import MobileToolbar from "./plugins/mobile-toolbar/mobileToolbar";
import SideToolbar from "./plugins/side-toolbar/sideToolbar";
import {
  DefaultDraftBlockRenderMap,
  EditorState,
  RichUtils,
} from "draft-js";
import Immutable from "immutable";

import "draft-js/dist/Draft.css";
import "./app.css";

import {highlightCodeOnChange} from "./utils/helper";
import {data} from "./data";
import {convertFromHTML} from "draft-convert";
import {importData} from "./utils/import";



interface Props {
  onImageClick?: () => Promise<string>;
  onVideoClick?: () => Promise<string>;
  dark?: boolean;
}

const noOp = () => Promise.resolve("");

const LetterpadEditor = (props: Props) => {
  const editorRef = useRef<Editor>(null);
  const [editorState, setEditorState] =
    useState<EditorState>(EditorState.createWithContent(importData(data)));

  useEffect(() => {
    const newStateWithCodeHighlight = highlightCodeOnChange(editorState);
    if (newStateWithCodeHighlight) {
      setEditorState(newStateWithCodeHighlight);
    }
  }, [editorState]);

  useEffect(() => {
    if (!props.dark) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [props.dark]);

  const focus = () => {
    editorRef.current?.focus();
  };

  const onChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const handleKeyCommand = (command: EditorCommand, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const pluginCallbacks = {
    onImageClick: props.onImageClick || noOp,
    onVideoClick: props.onVideoClick || noOp,
  };

  const blockRenderMap = Immutable.Map({
    unstyled: {
      element: "section",
    },
  });

  // Include 'paragraph' as a valid block and updated the unstyled element but
  // keep support for other draft default block types
  const extendedBlockRenderMap =
    DefaultDraftBlockRenderMap.merge(blockRenderMap);

  return (
    <div className="editor" onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins(pluginCallbacks)}
        handleKeyCommand={handleKeyCommand}
        ref={editorRef}
        blockRenderMap={extendedBlockRenderMap}
      />

      <MobileToolbar
        getImageUrl={pluginCallbacks.onImageClick}
        getVideoUrl={pluginCallbacks.onVideoClick}
      />
      <InlineToolbar />
      <SideToolbar
        getImageUrl={pluginCallbacks.onImageClick}
        getVideoUrl={pluginCallbacks.onVideoClick}
      />

      <br />
      <br />
      <br />

      {/* <textarea rows={50} cols={80} style={{ maxWidth: "80vw" }}>
        {stateToHTML(editorState.getCurrentContent())}
      </textarea> */}
    </div>
  );
};

export default LetterpadEditor;
