import {useState} from "react";
import ReactDOM from "react-dom";
import LetterpadEditor from "../src/letterpad-editor";
// import LetterpadEditor from "../dist/letterpad-editor";
import { data } from "./data";

const Demo = () => {
  const [html, setHtml] = useState("");

  const handleImage = (insert) => {
    insert(
      "https://reactrocket.com/img/blog/draft-js-basic-editor.gif",
    );
  };

  const handleVideo = (insert) => {
    insert(
      "https://www.youtube.com/watch?v=M3BM9TB-8yA",
    );
  };

  const params = new URL(document.location.href).searchParams;

  return (
    <div>
      <LetterpadEditor
        html={data}
        onImageClick={handleImage}
        onVideoClick={handleVideo}
        dark={params.get("dark") === ""}
        onChange={(change) => {
          setHtml(change);
        }}
      />
      <hr />
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
