// import renderer from "react-test-renderer";
import React from "react";
// import { Editor } from "slate";
import { Editor } from "slate-react";
// import initialValue from "./initialValue";
import { Value, ValueJSON } from "slate";
// import { AudioPlugin } from "../slatePlugin";
// import { applyAudio } from "../AudioUtils";
import { render } from "react-dom";

jest.mock("getSelection", () => {});
// const slatePlugin = AudioPlugin();
describe("audio", () => {
  //   let editor: Editor;
  beforeAll(() => {
    // Window.prototype.getSelection();
    // Object.defineProperty(window, "getSelection", {
    //   value: {}
    // });
  });
  beforeEach(() => {
    // editor = new Editor({
    //   plugins: [slatePlugin],
    //   value: Value.fromJSON(initialValue)
    // });
  });
  describe("slatePlugin", () => {
    test("integration", () => {
      //   editor = applyAudio(editor, "audio", "a.mp3");

      const expected: ValueJSON = {
        object: "value",
        document: {
          object: "document",
          data: {},
          nodes: [
            {
              object: "block",
              type: "audio",
              data: { src: "a.mp3" },
              nodes: [
                {
                  object: "text",
                  leaves: [
                    {
                      object: "leaf",
                      text: "A line of text in a paragraph. ",
                      marks: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      };
      //   const spyFunc = jest.fn();
      //   Object.defineProperty(global, "getSelection", {
      //     value: spyFunc
      //   });
      //   expect(spyFunc).toHaveBeenCalled();
      const root = document.createElement("div");

      render(<Editor value={Value.fromJSON(expected)} />, root);

      console.log(root.innerHTML);
      //   expect(editor.value.toJS()).toEqual(expected);
    });
  });
});
