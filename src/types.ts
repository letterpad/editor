import { Node, Mark as TMark, Value } from "slate";

import { Editor as ReactEditor } from "slate-react";
import { SyntheticEvent } from "react";

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

export interface IPlugin {
  onClick?: (e: SyntheticEvent) => void;
  onKeyDown?: (e: KeyboardEvent, editor: ReactEditor, next: Function) => void;
}

export interface ISerializer {
  deserialize: (str: string) => Value;
  serialize: (value: Value) => string;
}
