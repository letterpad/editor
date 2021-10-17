const noop = () => null;

export const callbacks = {
  onImageClick: noop,
  onVideoClick: noop,
  onChange: () => null,
  setHelpers: () => null,
};

export const defaultProps = {
  placeholder: "Compose a story",
  dark: false,
  html: "",
  ...callbacks,
};
