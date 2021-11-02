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

  const { className } = props;

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
