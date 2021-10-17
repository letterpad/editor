import { EditorBlock } from "draft-js";

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

  return (
    <div className="image-block">
      <figure>
        <img src={imgSrc} style={{ maxWidth: "100%", width }} />
        <Caption {...props} />
      </figure>
    </div>
  );
};
