import { EditorState } from "draft-js";
import { BlockKey } from "@src/types";

export interface InsertImageType {
  src: string;
  caption: string;
  width?: number | string;
  height?: number | string;
  state: EditorState;
}

export type ImageData = Omit<InsertImageType, "state">;

export type StateTypes = {
  setEditorState?: (state: EditorState) => void;
  getEditorState?: () => EditorState;
};

export interface ImageBlockData {
  blockKey: BlockKey;
  data: Partial<ImageData>;
  state: EditorState;
}
export interface UpdateImage {
  blockKey: BlockKey;
  data: Partial<ImageData>;
  setState: (state: EditorState) => void;
  getState: () => EditorState;
}
