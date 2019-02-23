import React, { Component } from "react";
import { LetterpadEditor } from "./editor";

class Demo extends Component {
  onButtonClick = (_: MouseEvent, type: string) => {
    console.log(type);
  };

  onBeforeRender = (props: { type: string }) => {
    if (props.type == "strong") {
      console.log("foo");
    }
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
