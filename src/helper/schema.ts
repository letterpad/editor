import { Editor, Node, SchemaProperties } from "slate";

function removeInlines(
  editor: Editor,
  error: { code: string; node: Node; child: Node }
) {
  if (error.code === "child_object_invalid") {
    editor.unwrapInlineByKey(error.child.key, error.child.type);
  }
}

const schema: SchemaProperties = {
  blocks: {
    heading1: {
      nodes: [{ match: { object: "text" } }],
      marks: [""],
      normalize: removeInlines
    },
    heading2: {
      nodes: [{ match: { object: "text" } }],
      marks: [""],
      normalize: removeInlines
    },
    heading3: {
      nodes: [{ match: { object: "text" } }],
      marks: [""],
      normalize: removeInlines
    },
    heading4: {
      nodes: [{ match: { object: "text" } }],
      marks: [""],
      normalize: removeInlines
    },
    heading5: {
      nodes: [{ match: { object: "text" } }],
      marks: [""],
      normalize: removeInlines
    },
    heading6: {
      nodes: [{ match: { object: "text" } }],
      marks: [""],
      normalize: removeInlines
    },
    code: {
      marks: [""]
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
        { type: "check-list" }
      ],
      nodes: [
        {
          match: [
            { object: "text" },
            { type: "image" },
            { type: "paragraph" },
            { type: "bulleted-list" },
            { type: "ordered-list" },
            { type: "check-list" }
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
          { type: "check-list" },
          { type: "block-toolbar" },
          { type: "table" },
          { type: "link" }
        ],
        min: 1
      }
    ]
  }
};

export default schema;
