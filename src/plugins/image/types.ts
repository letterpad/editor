import { EditorState } from "draft-js";
import { BlockKey } from "@src/types";

export interface InsertImageType {
  src: string;
  caption: string;
  placeholderSrc?: string;
  width?: number | string;
  height?: number | string;
  getState: () => EditorState;
  setState: (state: EditorState) => void;
}

export type ImageData = Omit<InsertImageType, "setState" | "getState">;

export type StateTypes = {
  setEditorState?: (state: EditorState) => void;
  getEditorState?: () => EditorState;
};

export interface UpdateImage {
  blockKey: BlockKey;
  data: Partial<ImageData>;
  setState: (state: EditorState) => void;
  getState: () => EditorState;
}
