import { EditorBlock } from "draft-js";
import { useMemo } from "react";

export const Caption = (props) => {
  return (
    <figcaption
      className="custom-block__caption"
      style={{ fontSize: "0.8rem" }}
    >
      <EditorBlock {...props} />
    </figcaption>
  );
};

export const ImageBlock = (props) => {
  const imgSrc = props.block.get("data").get("src");
  const width = props.block.get("data").get("width");

  const { className, theme = {}, ...otherProps } = props;
  // leveraging destructuring to omit certain properties from props
  const {
    block, // eslint-disable-line @typescript-eslint/no-unused-vars
    blockProps, // eslint-disable-line @typescript-eslint/no-unused-vars
    customStyleMap, // eslint-disable-line @typescript-eslint/no-unused-vars
    customStyleFn, // eslint-disable-line @typescript-eslint/no-unused-vars
    decorator, // eslint-disable-line @typescript-eslint/no-unused-vars
    forceSelection, // eslint-disable-line @typescript-eslint/no-unused-vars
    offsetKey, // eslint-disable-line @typescript-eslint/no-unused-vars
    selection, // eslint-disable-line @typescript-eslint/no-unused-vars
    tree, // eslint-disable-line @typescript-eslint/no-unused-vars
    blockStyleFn, // eslint-disable-line @typescript-eslint/no-unused-vars
    preventScroll, // eslint-disable-line @typescript-eslint/no-unused-vars
    contentState, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...elementProps
  } = otherProps;

  return (
    <>
      <Image src={imgSrc} width={width} className={className} />
      <Caption {...props} />
    </>
  );
};

const Image = ({
  src,
  width,
  className,
}: {
  src: string;
  width: string;
  className: string;
}) => {
  return useMemo(
    () => (
      <img
        src={src}
        style={{ maxWidth: "100%", width }}
        className={className}
      />
    ),
    [src, width]
  );
};
