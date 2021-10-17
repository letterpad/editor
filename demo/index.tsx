import { Editor, Helpers, TypeInsertImageFn } from "../src/types";
import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import LetterpadEditor from "../src/index";
import { data } from "./data";
import { createStore } from "@draft-js-plugins/utils";

const isLocalhost = new URL(document.location.href).hostname === "localhost";

const Demo = () => {
  const [html, setHtml] = useState("");
  const editorRef = useRef<Editor>(null);

  const handleImage = (insert: TypeInsertImageFn) => {
    insert({
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

  const setHelpers = (props: Helpers) => {
    setTimeout(() => {
      props.pluginHelpers.imagePlugin.insertImage({
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
        caption: "A nice caption here",
        width: 300,
        height: 200,
      });
    }, 3000);
  };
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
