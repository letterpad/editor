import { useState } from "react";
import ReactDOM from "react-dom";
import LetterpadEditor from "../src/index";
import { data } from "./data";

const isLocalhost = new URL(document.location.href).hostname === "localhost";

const Demo = () => {
  const [html, setHtml] = useState("");

  const handleImage = (insert) => {
    insert({
      url: "https://www.carolmusyoka.com/wp-content/uploads/2020/04/Freedom.jpg",
      caption: "captionis",
    });
  };

  const handleVideo = (insert) => {
    insert("https://www.youtube.com/watch?v=M3BM9TB-8yA");
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
      {isLocalhost && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
