import { composeDecorators, EditorPlugin } from "@draft-js-plugins/editor";
import createFocusPlugin from "@draft-js-plugins/focus";
import createDecorator from "@draft-js-plugins/focus/lib/createDecorator";
import "@draft-js-plugins/focus/lib/plugin.css";
composeDecorators;
import style from "./focus.module.css";

export type FocusEditorPlugin = EditorPlugin & {
  decorator: ReturnType<typeof createDecorator>;
};

export const focusPlugin = createFocusPlugin({
  theme: style,
}) as FocusEditorPlugin;

// @ts-ignore
export const focusDecorator = composeDecorators(
  focusPlugin.decorator
) as unknown;
