import { Helpers } from "./types";
const noop = () => {};

export const callbacks = {
  onImageClick: noop,
  onVideoClick: noop,
  onChange: (html: string, title?: string) => null,
  setHelpers: (helpers: Helpers) => null,
};

export const defaultProps = {
  placeholder: "Compose a story",
  dark: false,
  html: "",
  ...callbacks,
};
