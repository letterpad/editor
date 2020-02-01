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
    theme: "dark",
    readOnly: false
  };

  setEditorInstance = (editor: Editor) => {
    (window as any).__letterpadEditor = editor;
  };

  onThemeChange = theme => {
    this.setState({ theme });
  };

  handleToggleReadOnly = () => {
    this.setState({ readOnly: !this.state.readOnly });
  };

  render() {
    return (
      <Container>
        <br />
        <br />
        <br />
        <button type="button" onClick={this.handleToggleReadOnly}>
          {this.state.readOnly ? "Editable" : "Read Only"}
        </button>
        <button onClick={() => this.onThemeChange("dark")}>Dark</button>
        &nbsp;&nbsp;
        <button onClick={() => this.onThemeChange("light")}>Light</button>
        <br />
        <br />
        <br />
        <LetterpadEditor
          defaultValue={sampleMd}
          dark={this.state.theme === "dark"}
          getEditorInstance={this.setEditorInstance}
          readOnly={this.state.readOnly}
          onClickLink={console.log}
          uploadImage={file => {
            // you may save this in cloud and return a url
            return Promise.resolve(URL.createObjectURL(file));
          }}
          onChange={_value => {
            const result = _value();
            console.log("HTML", result.html);
            console.log("MD", result.markdown);
          }}
          getLinkComponent={(_node, attrs) => {
            if (_node.data.get("href").indexOf("youtube") < 0) {
              return props => (
                <div {...props.attributes} contentEditable={false}>
                  <iframe {...attrs}></iframe>
                </div>
              );
            }
          }}
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
