/**
 * Note: This is used for the e2e tests
 */
import React, { Component } from "react";

import { Editor } from "slate";
import { LetterpadEditor } from "../../src/editor";
import styled from "styled-components";

const sampleMd = require("../../src/initialText.md").default;

class Demo extends Component {
  state = {
    theme: "dark"
  };

  setEditorInstance = (editor: Editor) => {
    (window as any).__letterpadEditor = editor;
  };

  onThemeChange = theme => {
    this.setState({ theme });
  };

  render() {
    return (
      <Container>
        <button onClick={() => this.onThemeChange("dark")}>Dark</button>
        &nbsp;&nbsp;
        <button onClick={() => this.onThemeChange("light")}>Light</button>
        <LetterpadEditor
          defaultValue={sampleMd}
          dark={this.state.theme === "dark"}
          getEditorInstance={this.setEditorInstance}
          readOnly={false}
          uploadImage={file => {
            // you may save this in cloud and return a url
            return Promise.resolve(URL.createObjectURL(file));
          }}
          // onImageBrowse={() => {
          //   console.log("on browse");
          // }}
          onChange={(_value: () => void) => {
            console.log(_value());
          }}
          style="body { font-size: 16px; }"
          // getLinkComponent={(node: Node) => {
          //   const href = node.data.get("href");
          //   console.log(node);
          // return () => <div {...node.attributes}>node</div>;
          // }}
        />
      </Container>
    );
  }
}

export default Demo;

const Container = styled.div`
  width: 700px;
  margin: auto;
`;
