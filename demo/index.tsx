import ReactDOM from "react-dom";
import Editor from "../src/editor";

const Demo = () => {
  const handleImage = () => {
    return Promise.resolve(
      "https://reactrocket.com/img/blog/draft-js-basic-editor.gif",
    );
  };

  return <Editor onImageClick={handleImage} />;
};

ReactDOM.render(<Demo />, document.getElementById("root"));
