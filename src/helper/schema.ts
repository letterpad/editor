import { Block, SchemaProperties } from "slate";

const schemaProps: SchemaProperties = {
  document: {
    last: [
      {
        type: "p"
      }
    ],
    normalize: (editor, { code, node }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("p");
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    }
  },
  inlines: {
    img: {
      isVoid: true
    }
  }
};

export default schemaProps;
