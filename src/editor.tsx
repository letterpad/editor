import React, { useEffect, useRef, useState } from "react";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import { markdownToDraft } from "markdown-draft-js";

import { stateToHTML } from "draft-js-export-html";
import { plugins } from "./plugins";
import InlineToolbar from "./plugins/inline-toolbar/inlineToolbar";
import MobileToolbar from "./plugins/mobile-toolbar/mobileToolbar";
import SideToolbar from "./plugins/sideToolbar";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

const text = "Hello there";

import "draft-js/dist/Draft.css";
import "./app.css";

import { highlightCodeOnChange } from "./utils/helper";
import { data } from "./data";

const editorStateDefault = EditorState.createWithContent(
  convertFromRaw(markdownToDraft(data)),
);

interface Props {
  onImageClick: () => Promise<string>;
}

const LetterpadEditor = (props: Props) => {
  const editorRef = useRef<Editor>(null);
  const [editorState, setEditorState] =
    useState<EditorState>(editorStateDefault);

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
  };

  const pluginCallbacks = {
    onImageClick: props.onImageClick,
  };
  return (
    <div className="editor" onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins(pluginCallbacks)}
        ref={editorRef}
      />

      <MobileToolbar getImageUrl={props.onImageClick} />
      <InlineToolbar />
      {/* <AlignmentTool /> */}
      <SideToolbar getImageUrl={props.onImageClick} />

      <br />
      <br />
      <br />

      <textarea rows={50} cols={80} style={{ maxWidth: "80vw" }}>
        {stateToHTML(editorState.getCurrentContent())}
      </textarea>
    </div>
  );
};

export default LetterpadEditor;
