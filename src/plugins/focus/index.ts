import { composeDecorators } from "@draft-js-plugins/editor";
import createFocusPlugin from "@draft-js-plugins/focus";
import "@draft-js-plugins/focus/lib/plugin.css";

export const focusPlugin = createFocusPlugin();

export const focusDecorator = composeDecorators(focusPlugin.decorator);
