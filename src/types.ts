import { PluginFunctions } from "@draft-js-plugins/editor";
import PluginEditor from "@draft-js-plugins/editor/lib/Editor";
import { getPlugins } from "./plugins";
import { InsertImageAttrs } from "./plugins/image/types";

type EditorHelpers = PluginFunctions;

export type Editor = PluginEditor;

export type TypeMediaInsert = InsertImageAttrs;
export { default as EditorRef } from "@draft-js-plugins/editor";

export type TypeInsertImageFn = (
  props: TypeMediaInsert | TypeMediaInsert[]
) => void;

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
  editorRef: React.RefObject<Editor>;
  setHelpers: HelpersCallback;
}

export type PluginHelpers = {
  pluginHelpers: ReturnType<typeof getPlugins>["pluginsMap"];
};
