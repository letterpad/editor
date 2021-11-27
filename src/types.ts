import { PluginFunctions } from "@draft-js-plugins/editor";
import PluginEditor from "@draft-js-plugins/editor/lib/Editor";
import { getPlugins } from "@plugins/index";
import { ImageData } from "@plugins/image/types";

export type PluginsMap = ReturnType<typeof getPlugins>["pluginsMap"];
export interface EditorHelpers extends Omit<PluginFunctions, "getPlugins"> {
  getPlugins: () => PluginsMap;
}

export type Editor = PluginEditor;

export type TypeMediaInsert = ImageData;
export { default as EditorRef } from "@draft-js-plugins/editor";

export type BlockKey = string;

export type TypeInsertImageFn = <T extends TypeMediaInsert | TypeMediaInsert[]>(
  props: T
) => Promise<T extends TypeMediaInsert ? string : string[]>;

export type TypeMediaCallback = (insertImage: TypeInsertImageFn) => void;

export interface EditorCallbacks {
  onImageClick?: TypeMediaCallback;
  onChange: (html: string) => void;
}

export type HelpersCallback = (helpers: EditorHelpers) => void;

export interface EditorProps extends EditorCallbacks {
  placeholder?: string;
  dark?: boolean;
  html: string;
  editorRef?: React.RefObject<Editor>;
  setHelpers?: HelpersCallback;
}
