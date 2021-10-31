import { Editor, Helpers, TypeInsertImageFn } from "../src/types";
import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import LetterpadEditor from "../src/index";
import { data } from "./data";

const isLocalhost = new URL(document.location.href).hostname === "localhost";

const Demo = () => {
  const [html, setHtml] = useState("");
  const [helpers, setHelpers] = useState<Helpers>();
  const editorRef = useRef<Editor>(null);

  const handleImage = (insert: TypeInsertImageFn) => {
    const blockKey = insert({
      src: "https://www.carolmusyoka.com/wp-content/uploads/2020/04/Freedom.jpg",
      caption: "captionis",
      width: 200,
      placeholderSrc: "https://via.placeholder.com/600",
    });
  };

  const handleVideo = (insert) => {
    insert("https://www.youtube.com/watch?v=M3BM9TB-8yA");
  };
  const params = new URL(document.location.href).searchParams;

  return (
    <>
      <LetterpadEditor
        html={data}
        onImageClick={handleImage}
        onVideoClick={handleVideo}
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
