import { ValueJSON, BlockJSON } from "slate";

const introParas = [
  `
  Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text
  ever since the 1500s, when an unknown printer took a galley of
  type and scrambled it to make a type specimen book. It has survived
  not only five centuries, but also the leap into electronic
  typesetting, remaining essentially unchanged. It was popularised
  in the 1960s with the release of Letraset sheets containing Lorem
  Ipsum passages, and more recently with desktop publishing software
  like Aldus PageMaker including versions of Lorem Ipsum.
  `,
  `
  Letterpad is an open-source and a high
  performant publishing engine for blogs with a state-of-the-art
  technology. It uses React, GraphQL, Express and Sequelize ORM.
  Few of the core features are listed below:
  `
];

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
        type: "p",
        nodes: [
          {
            object: "inline",
            type: "img",
            data: {
              src:
                "https://cdn.pixabay.com/photo/2017/12/29/18/47/nature-3048299__340.jpg"
            }
          }
        ]
      },

      {
        object: "block",
        type: "p",
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
      ...(introParas.map(para => ({
        object: "block",
        type: "p",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: para
                  .trim()
                  .split("\n")
                  .join(" ")
              }
            ]
          }
        ]
      })) as any),
      {
        object: "block",
        type: "p",
        nodes: [
          {
            object: "inline",
            type: "img",
            data: {
              src:
                "https://cdn.pixabay.com/photo/2017/12/29/18/47/nature-3048299__340.jpg"
            }
          }
        ]
      },
      {
        object: "block",
        type: "p",
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
        type: "p",
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
        type: "p",
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
        type: "p",
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
