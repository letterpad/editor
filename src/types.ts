import { Value, Node, Mark as TMark } from "slate";
import { Editor as ReactEditor } from "slate-react";

export type SlateNodeProps = {
  children: React.ReactChildren;
  readOnly: boolean;
  attributes: Object;
  value: Value;
  editor: ReactEditor;
  node: Node;
  parent: Node;
  mark: TMark;
  isSelected: boolean;
};
