import createDividerPlugin from "@draft-js-plugins/divider";
import { focusDecorator } from "../focus";

export const dividerPlugin = createDividerPlugin({
  decorator: focusDecorator,
});
export const { DividerButton } = dividerPlugin;
export const addDivider = dividerPlugin.addDivider;
