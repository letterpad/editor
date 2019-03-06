import { ValueJSON } from "slate";

// const introParas = [
//   `
//   Lorem Ipsum is simply dummy text of the printing and typesetting
//   industry. Lorem Ipsum has been the industry's standard dummy text
//   ever since the 1500s, when an unknown printer took a galley of
//   type and scrambled it to make a type specimen book. It has survived
//   not only five centuries, but also the leap into electronic
//   typesetting, remaining essentially unchanged. It was popularised
//   in the 1960s with the release of Letraset sheets containing Lorem
//   Ipsum passages, and more recently with desktop publishing software
//   like Aldus PageMaker including versions of Lorem Ipsum.
//   `,
//   `
//   Letterpad is an open-source and a high
//   performant publishing engine for blogs with a state-of-the-art
//   technology. It uses React, GraphQL, Express and Sequelize ORM.
//   Few of the core features are listed below:
//   `
// ];

// const features = [
//   "Server side rendering",
//   "Multi author support",
//   "Comments (Disqus integration)",
//   "Google Analytics",
//   "Theme support",
//   "Multi-level navigation",
//   "Image optimizer",
//   "React with styled-components for styling",
//   "GraphQL for JSON API",
//   "Roles - Admin, Reviewer, Author, Reader",
//   "Markdown and RichText editor",
//   "Search Engine Optimised",
//   "Multi-language support with react-i18next (currently en, fr and pl)"
// ];

const initialValue: ValueJSON = {
  document: {
    nodes: [
      {
        object: "block",
        type: "section",
        nodes: [
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 1600,
                  height: 500,
                  align: "wide",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1500058504985-a3bbdb0a7781?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 525,
                  height: 350,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1500058504985-a3bbdb0a7781?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1551300263-00574a9d9b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 243,
                  height: 365,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1551300263-00574a9d9b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 413,
                  height: 620,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 894,
                  height: 596,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 1600,
                  height: 500,
                  align: "wide",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1500058504985-a3bbdb0a7781?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 525,
                  height: 350,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1500058504985-a3bbdb0a7781?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1551300263-00574a9d9b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 243,
                  height: 365,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1551300263-00574a9d9b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 413,
                  height: 620,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                }
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {
              src:
                "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80"
            },
            nodes: [
              {
                object: "inline",
                type: "img",
                data: {
                  width: 894,
                  height: 596,
                  align: "full",
                  title: "https://unsplash.com/photos/5bYxXawHOQg",
                  src:
                    "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80"
                }
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "h3",
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
        type: "section",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Demo of letterpad editor."
              }
            ]
          },
          {
            object: "inline",
            type: "img",
            data: {
              align: "full",
              title: "https://unsplash.com/photos/5bYxXawHOQg",
              src:
                "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
            }
          }
        ]
      }

      // ...(introParas.map(para => ({
      //   object: "block",
      //   type: "p",
      //   nodes: [
      //     {
      //       object: "text",
      //       leaves: [
      //         {
      //           object: "leaf",
      //           text: para
      //             .trim()
      //             .split("\n")
      //             .join(" ")
      //         }
      //       ]
      //     }
      //   ]
      // })) as any),
      // {
      //   object: "block",
      //   type: "section",
      //   nodes: [
      //     {
      //       object: "inline",
      //       type: "img",
      //       data: {
      //         align: "left",
      //         title: "https://unsplash.com/photos/2LJ4rqK2qfU",
      //         src:
      //           "https://images.unsplash.com/photo-1501349800519-48093d60bde0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      //       }
      //     }
      //   ]
      // },
      // {
      //   object: "block",
      //   type: "section",
      //   nodes: [
      //     {
      //       object: "text",
      //       leaves: [
      //         {
      //           object: "leaf",
      //           text:
      //             "Lorem Ipsum is simply dummy text of the printing and typesetting   industry. Lorem Ipsum has been the industry's standard dummy text   ever since the 1500s, when an unknown printer took a galley of   type and scrambled it to make a type specimen book. It has survived   not only five centuries, but also the leap into electronic   typesetting, remaining essentially unchanged. It was popularised   in the 1960s with the release of Letraset sheets containing Lorem   Ipsum passages, and more recently with desktop publishing software   like Aldus PageMaker including versions of Lorem Ipsum."
      //         }
      //       ]
      //     }
      //   ]
      // },

      // {
      //   object: "block",
      //   type: "ul",
      //   nodes: features.map(
      //     feature =>
      //       ({
      //         object: "block",
      //         type: "li",
      //         nodes: [
      //           {
      //             object: "text",
      //             leaves: [
      //               {
      //                 object: "leaf",
      //                 text: feature
      //               }
      //             ]
      //           }
      //         ]
      //       } as BlockJSON)
      //   )
      // },
      // {
      //   object: "block",
      //   type: "figure",
      //   data: {
      //     src:
      //       "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
      //   },
      //   nodes: [
      //     {
      //       object: "inline",
      //       type: "img",
      //       data: {
      //         align: "wide",
      //         title: "https://unsplash.com/photos/5bYxXawHOQg",
      //         src:
      //           "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
      //       }
      //     }
      //   ]
      // }
    ]
  }
};

export const blocks = {
  img: {
    isVoid: true
  }
};

export default initialValue;
