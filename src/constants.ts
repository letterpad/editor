const noop = () => {};

export const callbacks = {
  onImageClick: noop,
  onVideoClick: noop,
  onChange: (html: string, title?: string) => null,
};

export const defaultProps = {
  placeholder: "Compose a story",
  dark: false,
  html: "",
  ...callbacks,
};
