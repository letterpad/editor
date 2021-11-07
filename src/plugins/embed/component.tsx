import React from "react";
import { EmbedType } from "./types";

const Embed = (props) => {
  const {
    theme,
    block, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blockProps, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customStyleMap, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customStyleFn, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decorator, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forceSelection, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    offsetKey, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selection, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tree, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    contentState, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blockStyleFn, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    style,
    className, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...elementProps
  } = props;

  const classname = [className].join(" ");
  const { type, src } = contentState.getEntity(block.getEntityAt(0)).getData();

  if (type === EmbedType.Github) {
    return (
      <iframe
        frameBorder={0}
        scrolling="no"
        srcDoc={`<html><body><script src="${src}"></script></body></html>`}
      ></iframe>
    );
  }

  if (type === EmbedType.Youtube) {
    return <iframe frameBorder={0} scrolling="no" src={src}></iframe>;
  }

  return null;
};

export default Embed;
