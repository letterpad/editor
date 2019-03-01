import { ValueJSON, BlockJSON } from "slate";

const introPara = `
Letterpad is an open-source and a high
performant publishing engine for blogs with a state-of-the-art
technology. It uses React, GraphQL, Express and Sequelize ORM.
Few of the core features are listed below:
`
  .trim()
  .split("\n")
  .join(" ");

const features = [
  "Server side rendering",
  "Multi author support",
  "Comments (Disqus integration)",
  "Google Analytics",
  "Theme support",
  "Multi-level navigation",
  "Image optimizer",
  "React with styled-components for styling",
  "GraphQL for JSON API",
  "Roles - Admin, Reviewer, Author, Reader",
  "Markdown and RichText editor",
  "Search Engine Optimised",
  "Multi-language support with react-i18next (currently en, fr and pl)"
];

const initialValue: ValueJSON = {
  document: {
    nodes: [
      {
        object: "block",
        type: "h1",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Letterpad"
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: introPara
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: ""
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: ""
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: ""
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: ""
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "ul",
        nodes: features.map(
          feature =>
            ({
              object: "block",
              type: "li",
              nodes: [
                {
                  object: "text",
                  leaves: [
                    {
                      object: "leaf",
                      text: feature
                    }
                  ]
                }
              ]
            } as BlockJSON)
        )
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
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
