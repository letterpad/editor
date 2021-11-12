import React, { useMemo } from "react";
import { EmbedType } from "./types";
import defaultTheme from "./theme.module.css";

const Embed = (props) => {
  const {
    theme, // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    style, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...elementProps
  } = props;

  // const { type, src } = contentState.getEntity(block.getEntityAt(0)).getData();
  return useMemo(() => {
    return (
      <Iframe
        type={blockProps.type}
        src={blockProps.src}
        theme={theme}
        className={className}
      />
    );
  }, [blockProps.src, blockProps.type, className]);
};

interface IFrameProps {
  type: string;
  src: string;
  theme?: typeof defaultTheme;
  className?: string;
}
export const Iframe = ({
  type,
  src,
  theme = defaultTheme,
  className,
}: IFrameProps) => {
  if (type === EmbedType.Github) {
    return (
      <div className={theme.wrapper + " " + className}>
        <iframe
          className={theme.iframe}
          frameBorder={0}
          scrolling="no"
          srcDoc={`<html><body><script src="${src}"></script></body></html>`}
        />
      </div>
    );
  }

  if (type === EmbedType.Youtube) {
    return (
      <div className={theme.wrapper + " " + className}>
        <iframe
          frameBorder={0}
          scrolling="no"
          src={src}
          className={theme.iframe}
        />
      </div>
    );
  }

  if (type === EmbedType.CodeSandbox) {
    return (
      <div className={theme.wrapper + " " + className}>
        <iframe
          className={theme.iframe}
          src={src}
          frameBorder={0}
          // sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>
    );
  }

  return null;
};
export default Embed;
