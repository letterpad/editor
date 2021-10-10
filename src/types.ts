import PluginEditor from "@draft-js-plugins/editor/lib/Editor";

export type Editor = PluginEditor;

export { default as EditorRef } from "@draft-js-plugins/editor";

export type TypeMediaInsert = { url: string; caption?: string };

export type TypeInsertImageFn = (
  props: TypeMediaInsert | TypeMediaInsert[]
) => void;

export type TypeMediaCallback = (insertImage: TypeInsertImageFn) => void;

export interface EditorCallbacks {
  onImageClick?: TypeMediaCallback;
  onVideoClick?: TypeMediaCallback;
  onChange: (html: string, title?: string) => void;
}

export interface EditorProps extends EditorCallbacks {
  placeholder?: string;
  dark?: boolean;
  html: string;
  editorRef: React.RefObject<Editor>;
}
