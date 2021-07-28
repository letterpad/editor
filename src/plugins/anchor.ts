import createLinkPlugin from "@draft-js-plugins/anchor";
import linkStyles from "./linkStyles.module.css";

export const linkPlugin = createLinkPlugin({
  theme: linkStyles,
  placeholder: "http://…",
});
export const LinkPluginButton = linkPlugin.LinkButton;
