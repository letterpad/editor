export type TypeMediaInsert = { url: string; caption?: string };

export type TypeMediaCallback = (
  props: TypeMediaInsert | TypeMediaInsert[]
) => void;

export interface EditorCallbacks {
  onImageClick?: TypeMediaCallback;
  onVideoClick?: TypeMediaCallback;
  onChange: (html: string, title?: string) => void;
}

export interface EditorProps extends EditorCallbacks {
  placeholder?: string;
  dark?: boolean;
  html: string;
}
