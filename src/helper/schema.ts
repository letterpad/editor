import { SchemaProperties, Editor, SlateError } from "slate";

const schema: SchemaProperties = {
  blocks: {
    heading1: {
      nodes: [{ match: { object: "text" } }],
      marks: [{ type: "" }],
      normalize: removeInlines
    },
    heading2: {
      nodes: [{ match: { object: "text" } }],
      marks: [{ type: "" }],
      normalize: removeInlines
    },
    heading3: {
      nodes: [{ match: { object: "text" } }],
      marks: [{ type: "" }],
      normalize: removeInlines
    },
    heading4: {
      nodes: [{ match: { object: "text" } }],
      marks: [{ type: "" }],
      normalize: removeInlines
    },
    heading5: {
      nodes: [{ match: { object: "text" } }],
      marks: [{ type: "" }],
      normalize: removeInlines
    },
    heading6: {
      nodes: [{ match: { object: "text" } }],
      marks: [{ type: "" }],
      normalize: removeInlines
    },
    code: {
      marks: [{ type: "" }]
    },
    "horizontal-rule": {
      isVoid: true
    },
    image: {
      isVoid: true
    },
    link: {
      nodes: [{ match: { object: "text" } }]
    },
    "block-toolbar": {
      isVoid: true
    },
    "list-item": {
      parent: [
        { type: "bulleted-list" },
        { type: "ordered-list" },
        { type: "todo-list" }
      ],
      nodes: [
        {
          match: [
            { object: "text" },
            { type: "image" },
            { type: "paragraph" },
            { type: "bulleted-list" },
            { type: "ordered-list" },
            { type: "todo-list" }
          ]
        }
      ]
    }
  },
  document: {
    nodes: [
      {
        match: [
          { type: "paragraph" },
          { type: "heading1" },
          { type: "heading2" },
          { type: "heading3" },
          { type: "heading4" },
          { type: "heading5" },
          { type: "heading6" },
          { type: "block-quote" },
          { type: "code" },
          { type: "horizontal-rule" },
          { type: "image" },
          { type: "bulleted-list" },
          { type: "ordered-list" },
          { type: "todo-list" },
          { type: "block-toolbar" },
          { type: "table" },
          { type: "link" }
        ],
        min: 1
      }
    ]
  }
};

function removeInlines(editor: Editor, error: SlateError) {
  if (error.code === "child_object_invalid") {
    // console.log(error.child);
    editor.unwrapInlineByKey(error.child.key, error.child.type);
  }
}

// const schemaProps: SchemaProperties = {
//   document: {
//     last: [
//       {
//         type: "p"
//       }
//     ],
//     normalize: (editor, { code, node }) => {
//       switch (code) {
//         case "last_child_type_invalid": {
//           const paragraph = Block.create("p");
//           return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
//         }
//       }
//     }
//   },
//   inlines: {
//     img: {
//       isVoid: true
//     }
//   },
//   blocks: {
//     hr: {
//       isVoid: true
//     }
//   }
// };

export default schema;
