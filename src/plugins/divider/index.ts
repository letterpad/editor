import createDividerPlugin from "@draft-js-plugins/divider";
import { focusDecorator } from "@plugins/focus";
import dividerStyles from "./divider.module.css";

export const dividerPlugin = createDividerPlugin({
  decorator: focusDecorator,
  theme: dividerStyles,
});
export const { DividerButton } = dividerPlugin;
export const addDivider = dividerPlugin.addDivider;
