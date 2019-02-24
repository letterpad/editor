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
      },
      {
        object: "block",
        type: "iframe",
        data: {
          src: "https://www.youtube.com/embed/tgbNymZ7vqY",
          width: 200,
          height: 200
        }
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
