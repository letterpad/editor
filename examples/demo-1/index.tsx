import { Editor, Node } from "slate";
/**
 * Note: This is used for the e2e tests
 */
import React, { Component } from "react";

import { LetterpadEditor } from "../../src/editor";

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

  onBeforeRender = (editor: Editor) => {
    // if (props.type == "strong") {
    //   console.log("foo");
    // }
    (window as any).__letterpadEditor = editor;
  };

  render() {
    return (
      <LetterpadEditor
        // theme="dark"
        // onButtonClick={this.onButtonClick}
        onBeforeRender={this.onBeforeRender}
        // spellCheck={false}
        // defaultFont={true}
        // onImageBrowse={() => {
        //   console.log("on browse");
        // }}
        onChange={(_value: () => void) => {
          console.log(_value());
        }}
        // getLinkComponent={(node: Node) => {
        //   const href = node.data.get("href");
        //   console.log(node);
        //   return GoogleEmbed;
        //   // return () => <div {...node.attributes}>node</div>;
        // }}
        // getCharCount={(count: number) => {
        //   // count is available.
        //   if (count) {
        //     // typescript - this is only to allow the unused variable
        //   }
        // }}
        // html={sampleHtml}
        // hooks={(editor, hooks) => {
        //   console.log(editor, hooks);
        // }}
      />
    );
  }
}

export default Demo;

class GoogleEmbed extends React.Component<any> {
  render() {
    const { attributes, node } = this.props;
    return <p {...attributes}>Google Embed ({node.data.get("href")})</p>;
  }
}
