import { ValueJSON } from "slate";

const initialValue: ValueJSON = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "A line of text in a paragraph. "
              }
            ]
          }
        ]
      }
    ]
  }
};

export default initialValue;
