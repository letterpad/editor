import React, { Component } from "react";
import { LetterpadEditor } from "./editor";
import { Editor } from "slate";

class Demo extends Component {
  onButtonClick = (_: MouseEvent, type: string) => {
    console.log(type);
  };

  onBeforeRender = (props: { type: string; props: { editor: Editor } }) => {
    if (props.type == "strong") {
      console.log("foo");
    }
    (window as any).__letterpadEditor = props.props.editor;
  };

  render() {
    return (
      <LetterpadEditor
        onButtonClick={this.onButtonClick}
        onBeforeRender={this.onBeforeRender}
      />
    );
  }
}

export default Demo;
