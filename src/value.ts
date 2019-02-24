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
          },
          {
            object: "inline",
            type: "a",
            data: {
              href: "https://en.wikipedia.org/wiki/Hypertext"
            },
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "hyperlinks"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export const blocks = {
  img: {
    isVoid: true
  }
};

export default initialValue;
