import {useState} from "react";
import ReactDOM from "react-dom";
import Editor from "../src/editor";
import { data } from "./data";

const Demo = () => {
  const [html, setHtml] = useState("");

  const handleImage = () => {
    return Promise.resolve(
      "https://reactrocket.com/img/blog/draft-js-basic-editor.gif",
    );
  };

  const handleVideo = () => {
    return Promise.resolve("https://www.youtube.com/watch?v=M3BM9TB-8yA");
  };

  const params = new URL(document.location.href).searchParams;

  return (
    <div>
      <Editor
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
