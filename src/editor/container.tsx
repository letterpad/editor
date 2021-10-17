import { StoreContextProvider } from "../store";
import LetterpadEditor from "../editor";
import { EditorProps } from "../types";
import { EditorState } from "draft-js";
import { importData } from "../utils/import";
import "draft-js/dist/Draft.css";
import "../app.css";
import useTheme from "../hooks/theme";
import { callbacks } from "../callbacks";
import { useEffect } from "react";
import { defaultProps } from "../constants";

const Container = (props: EditorProps) => {
  useTheme(props.dark);
  const mergedProps = { ...defaultProps, ...props };

  const userCallbacks = {
    onImageClick: mergedProps.onImageClick,
    onVideoClick: mergedProps.onVideoClick,
    onChange: mergedProps.onChange,
    setHelpers: mergedProps.setHelpers,
  };

  useEffect(() => {
    callbacks.set(userCallbacks);
  }, []);

  return (
    <StoreContextProvider
      value={EditorState.createWithContent(importData(props.html))}
    >
      <LetterpadEditor {...mergedProps} />
    </StoreContextProvider>
  );
};
export default Container;
