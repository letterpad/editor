import { Node, Mark as TMark, Value } from "slate";

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

export type ISearchResult = {
  title: string;
  url: string;
};
