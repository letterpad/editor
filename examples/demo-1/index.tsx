/**
 * Note: This is used for the e2e tests
 */
import React, { Component } from "react";
import { LetterpadEditor } from "../../src/editor";
// import LetterpadEditor from "../../bundles/bundle";
import { Editor } from "slate";
const sampleHtml = require("../../src/htmlValue.html");

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
        theme="dark"
        onButtonClick={this.onButtonClick}
        onBeforeRender={this.onBeforeRender}
        spellCheck={false}
        onChange={(html: string) => {
          console.log(html);
        }}
        getCharCount={(count: number) => {
          // count is available.
          if (count) {
            // typescript - this is only to allow the unused variable
          }
        }}
        html={sampleHtml}
      />
    );
  }
}

export default Demo;
