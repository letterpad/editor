/**
 * Note: This is used for the e2e tests
 */
import React, { Component } from "react";
import { LetterpadEditor } from "../../src/editor";
import { Editor } from "slate";
import Gallery from "./Gallery";

class Demo extends Component {
  onButtonClick = (
    _: MouseEvent,
    type: string,
    callbacks: { [key: string]: any }
  ) => {
    return false;
    // the below is a demo to fetch images from giphy based on a search term.
    // remove the above return to check it
    if (type == "img") {
      if (callbacks.showPlaceholder) {
        callbacks.showPlaceholder(Gallery);
        return true;
      }
    }
  };

  onBeforeRender = (props: { type: string; props: { editor: Editor } }) => {
    // if (props.type == "strong") {
    //   console.log("foo");
    // }
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
