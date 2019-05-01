import { ValueJSON } from "slate";

// const introParas = [
//   `
//   This editor gives a high level api of the [slate editor](https://slatejs.org) along with a flexible plugin architecture. It comes with a bunch of rich plugins for most of your use cases. You can extend any of the plugins or create your own plugins. The letterpad editor has a dynamic markdown editor which renders the preview inline as you type.
//   It was popularised
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
        type: "h3",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Letterpad Editor",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "The letterpad editor is a high level API of the ",
                marks: []
              }
            ]
          },
          {
            object: "inline",
            type: "a",
            data: {
              href: "https://slatejs.org"
            },
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "slatejs",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  " editor with a robust plugin architecture. It comes with a set of rich plugins (each plugin is a feature) which can be extended to build more complex features. The editor also has markdown capabilites which generates inline previews as you start writing in markdown. This page is editable and is the playground of this error. The toolbars are visible when you select some text or in a new line.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "hr",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Letterpad editor uses the below technologies.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "ul",
        data: {},
        nodes: [
          {
            object: "block",
            type: "li",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "React",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "li",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "Slatejs",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "li",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "Typescript",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "li",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "Styled Components",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "li",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "Webpack",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "li",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "Puppeteer",
                    marks: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "We have good documentation, if you would like to contribute with some plugins. Visit our ",
                marks: []
              }
            ]
          },
          {
            object: "inline",
            type: "a",
            data: {
              href: "https://github.com/letterpad/editor"
            },
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "github page",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: " for more information.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "blockquote",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "It has 100% end-to-end test coverage. So its easy to figure out if something broke due to your change.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "You can develop plugins like the one below. This is a gallery plugin.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "section",
        data: {},
        nodes: [
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 2551,
                  height: 1701,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/BrKGd4m/2.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 1350,
                  height: 900,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/vHftK2F/8.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 1350,
                  height: 900,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/G024j31/7.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 800,
                  height: 1000,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/DWvD3zm/3.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 622,
                  height: 1003,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/jghS0d7/1.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 1351,
                  height: 901,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/WPWL05f/6.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 1189,
                  height: 500,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/7bdT8Pn/4.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "block",
            type: "figure",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  width: 968,
                  height: 500,
                  align: "wide",
                  title: "",
                  src: "https://i.ibb.co/YyYh91g/5.jpg"
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "hr",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "You can embed media. Lets embed a youtube video.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "iframe",
        data: {
          width: "100%",
          height: "415",
          src: "https://www.youtube.com/embed/aETNYyrqNYE",
          frameborder: "0",
          allow:
            "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: true,
          allowFullScreen: true
        },
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "You can also embed a ",
                marks: []
              },
              {
                object: "leaf",
                text: "souncloud track",
                marks: [
                  {
                    object: "mark",
                    type: "code",
                    data: {}
                  }
                ]
              },
              {
                object: "leaf",
                text: " and or a ",
                marks: []
              },
              {
                object: "leaf",
                text: "website",
                marks: [
                  {
                    object: "mark",
                    type: "code",
                    data: {}
                  }
                ]
              },
              {
                object: "leaf",
                text: " or a ",
                marks: []
              },
              {
                object: "leaf",
                text: "gist",
                marks: [
                  {
                    object: "mark",
                    type: "code",
                    data: {}
                  }
                ]
              },
              {
                object: "leaf",
                text:
                  ". You can nicely highlight the words that need attention.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "hr",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "You can also have an image with different sizes to complement the content around it.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "figure",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          },
          {
            object: "inline",
            type: "img",
            data: {
              src:
                "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
              align: "full",
              title: ""
            },
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "Do you write code ? We have something for you. Its not pretty, but it works.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "pre",
        data: {
          language: ""
        },
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  '\nimport React from "react";\nimport { render } from "react-dom";\nimport LetterpadEditor from "letterpad-editor";\n\nrender(<LetterpadEditor />, document.getElementById("app"));\n',
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "However, you can add gists like so.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "iframe",
        data: {
          src:
            "https://gist.github.com/ajaxtown/f6b234dc10c42b32a503b574e3fc6b58"
        },
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: " Headings look like this:",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "h1",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Heading 1",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "h2",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Heading 2",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "h3",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Heading 3",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "h4",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Heading 4",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "h5",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Heading 5",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Texts can be ",
                marks: []
              },
              {
                object: "leaf",
                text: "bold and strong",
                marks: [
                  {
                    object: "mark",
                    type: "strong",
                    data: {}
                  }
                ]
              },
              {
                object: "leaf",
                text: " or they can be ",
                marks: []
              },
              {
                object: "leaf",
                text: "italic ",
                marks: [
                  {
                    object: "mark",
                    type: "em",
                    data: {}
                  }
                ]
              },
              {
                object: "leaf",
                text: "and ",
                marks: []
              },
              {
                object: "leaf",
                text: "underline",
                marks: [
                  {
                    object: "mark",
                    type: "u",
                    data: {}
                  }
                ]
              },
              {
                object: "leaf",
                text: ". ",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "Lets try to embed a soundcloud track. You can customize the height of embeds. Its just a iframe property.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "iframe",
        data: {
          width: "100%",
          height: "450",
          scrolling: "no",
          frameborder: "no",
          allow: "autoplay",
          src:
            "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/84654763&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        },
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "We have a custom unpublished plugin which a features to insert an image from giphy by searching with some keywords. Cool right ?",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "You can also embed plain audio like mp3. Its not very clean but you can enhance this feature.",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "audio",
        data: {
          src: "https://ccrma.stanford.edu/~jos/mp3/gtr-jaz-2.mp3"
        },
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "hr",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Oh you can also have a parallax image. ",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "figure",
        data: {
          src: "http://localhost/images/1.jpg"
        },
        nodes: [
          {
            object: "block",
            type: "p",
            data: {},
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              },
              {
                object: "inline",
                type: "img",
                data: {
                  src: "http://localhost/images/1.jpg",
                  align: "parallax",
                  title: ""
                },
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "",
                        marks: []
                      }
                    ]
                  }
                ]
              },
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "",
                    marks: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text:
                  "If you have any ideas on some interesting plugin, you can ",
                marks: []
              }
            ]
          },
          {
            object: "inline",
            type: "a",
            data: {
              href: "https://github.com/letterpad/editor/issues/new"
            },
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    object: "leaf",
                    text: "post them here",
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: ".",
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "p",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "",
                marks: []
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
