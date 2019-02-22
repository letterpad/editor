import App from "./App";

import React, { Component } from "react";

class Demo extends Component {
  onButtonClick = (_: MouseEvent, type: string) => {
    console.log(type);
  };

  onBeforeRender = (props: { type: string }) => {
    if (props.type == "strong") {
      return <h3>hello</h3>;
    }
  };

  render() {
    return (
      <App
        onButtonClick={this.onButtonClick}
        onBeforeRender={this.onBeforeRender}
      />
    );
  }
}

export default Demo;
