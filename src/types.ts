import { PluginFunctions } from "@draft-js-plugins/editor";
import PluginEditor from "@draft-js-plugins/editor/lib/Editor";
import { getPlugins } from "./plugins";
import { ImageData } from "./plugins/image/types";

type EditorHelpers = PluginFunctions;

export type Editor = PluginEditor;

export type TypeMediaInsert = ImageData;
export { default as EditorRef } from "@draft-js-plugins/editor";

export type BlockKey = string;

export type TypeInsertImageFn = (
  props: TypeMediaInsert | TypeMediaInsert[]
) => BlockKey;

export type TypeMediaCallback = (insertImage: TypeInsertImageFn) => void;

export interface EditorCallbacks {
  onImageClick?: TypeMediaCallback;
  onVideoClick?: TypeMediaCallback;
  onChange: (html: string, title?: string) => void;
}

export type Helpers = PluginHelpers & EditorHelpers;

export type HelpersCallback = (helpers: PluginHelpers & EditorHelpers) => void;

export interface EditorProps extends EditorCallbacks {
  placeholder?: string;
  dark?: boolean;
  html: string;
  editorRef?: React.RefObject<Editor>;
  setHelpers?: HelpersCallback;
}

export type PluginHelpers = {
  pluginHelpers: ReturnType<typeof getPlugins>["pluginsMap"];
};
