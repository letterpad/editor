import { Editor, EditorHelpers, TypeInsertImageFn } from "@src/types";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import LetterpadEditor from "@src";
import { data } from "./data";

const isLocalhost = new URL(document.location.href).hostname === "localhost";

const Demo = () => {
  const [html, setHtml] = useState(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [helpers, setHelpers] = useState<EditorHelpers>();
  const editorRef = useRef<Editor>(null);

  const handleImage = (insert: TypeInsertImageFn) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const blockKey = insert({
      src: "https://www.carolmusyoka.com/wp-content/uploads/2020/04/Freedom.jpg",
      caption: "captionis",
      width: 200,
      placeholderSrc: "https://via.placeholder.com/600",
    });
  };

  const params = new URL(document.location.href).searchParams;

  return (
    <>
      <LetterpadEditor
        html={html}
        onImageClick={handleImage}
        dark={params.get("dark") === ""}
        onChange={(change) => {
          setHtml(change);
        }}
        editorRef={editorRef}
        setHelpers={setHelpers}
      />
      <hr />
      {isLocalhost && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
