import ReactDOM from "react-dom";
import Editor from "../src/editor";

const Demo = () => {
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
    <Editor
      onImageClick={handleImage}
      onVideoClick={handleVideo}
      dark={params.get("dark") === ""}
    />
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
