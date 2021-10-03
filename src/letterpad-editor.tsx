import React, {useEffect, useRef, useState} from "react";
import Editor, {EditorCommand} from "@draft-js-plugins/editor";

import {plugins} from "./plugins";
import InlineToolbar from "./plugins/inline-toolbar/inlineToolbar";
import MobileToolbar from "./plugins/mobile-toolbar/mobileToolbar";
import SideToolbar from "./plugins/side-toolbar/sideToolbar";
import {DefaultDraftBlockRenderMap, EditorState, RichUtils} from "draft-js";
import Immutable from "immutable";

import "draft-js/dist/Draft.css";
import "./app.css";

import {highlightCodeOnChange} from "./utils/helper";
import {importData} from "./utils/import";
import {exportData} from "./utils/export";
import {TypeMediaCallback, TypeMediaInsert} from "./types";
import useTheme from "./hooks/theme";

interface Props {
  placeholder?: string;
  onImageClick?: TypeMediaCallback;
  onVideoClick?: TypeMediaCallback;
  dark?: boolean;
  onChange: (html: string) => void;
  html: string;
}

const noOp = () => {};

const LetterpadEditor = (props: Props) => {
  const editorRef = useRef<Editor>(null);
  useTheme(props.dark);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(importData(props.html))
  );

  useEffect(() => {
    const newStateWithCodeHighlight = highlightCodeOnChange(editorState);
    if (newStateWithCodeHighlight) {
      setEditorState(newStateWithCodeHighlight);
    }
  }, [editorState]);

  const focus = () => {
    editorRef.current?.focus();
  };


  const onChange = (newState: EditorState) => {
    setEditorState(newState);
    if (typeof props.onChange === "function") {
      props.onChange(exportData(newState.getCurrentContent()));
    }
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


  // Here we define the default block. It can be a paragraph but symentec html
  // does not allow div's to be placed inside p.
  const blockRenderMap = Immutable.Map({
    unstyled: {
      element: "section",
    },
  });

  const extendedBlockRenderMap =
    DefaultDraftBlockRenderMap.merge(blockRenderMap);

  return (
    <div className="editor" onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins()}
        handleKeyCommand={handleKeyCommand}
        ref={editorRef}
        blockRenderMap={extendedBlockRenderMap}
        placeholder={props.placeholder || "Write a story"}
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
    </div>
  );
};

export default LetterpadEditor;

export type {TypeMediaCallback, TypeMediaInsert};
