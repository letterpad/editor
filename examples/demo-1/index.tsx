/**
 * Note: This is used for the e2e tests
 */
import React, { Component } from "react";
import { LetterpadEditor } from "../../src/editor";
import { Editor } from "slate";
const sampleHtml = require("../../src/htmlValue.html");

// import Gallery from "./Gallery";

class Demo extends Component {
  onButtonClick = (
    _: MouseEvent,
    pluginName: string,
    callbacks: { [key: string]: any }
  ) => {
    return false;
    // the below is a demo to fetch images from giphy based on a search term.
    // remove the above return to check it
    if (pluginName == "plugin-image") {
      if (callbacks.showPlaceholder) {
        // callbacks.showPlaceholder(Gallery);
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
        defaultFont={true}
        onChange={(_html: string) => {}}
        getCharCount={(count: number) => {
          // count is available.
          if (count) {
            // typescript - this is only to allow the unused variable
          }
        }}
        html={sampleHtml}
        hooks={(editor, hooks) => {
          console.log(editor, hooks);
        }}
      />
    );
  }
}

export default Demo;
