import { StoreContextProvider } from "@store";
import LetterpadEditor from "@editor/index";
import React from "react";
import { EditorProps } from "@src/types";
import { EditorState } from "draft-js";
import { importData } from "@utils/import";
import useTheme from "@hooks/theme";
import { callbacks } from "@src/callbacks";
import { useCallback, useEffect } from "react";
import { defaultProps } from "@src/constants";
import "draft-js/dist/Draft.css";
import "../app.css";
import "prismjs/themes/prism.css";
import { removeTagsFromPre } from "@utils/helper";

const Container = (props: EditorProps) => {
  useTheme(props.dark);
  const mergedProps = { ...defaultProps, ...props };

  const userCallbacks = {
    onImageClick: useCallback(mergedProps.onImageClick, []),
    onChange: useCallback(mergedProps.onChange, []),
    setHelpers: useCallback(mergedProps.setHelpers, []),
  };

  useEffect(() => {
    callbacks.set(userCallbacks);
  }, []);
  const html = removeTagsFromPre(props.html);

  return (
    <StoreContextProvider
      value={EditorState.createWithContent(importData(html))}
    >
      <LetterpadEditor {...mergedProps} />
    </StoreContextProvider>
  );
};
export default Container;
