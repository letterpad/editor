import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { hasBlock } from "../../helper/strategy";
import { applyAudio } from "./AudioUtils";

const StyledInput = styled.input`
  font-size: medium;
  width: 100%;
  border: none;
  outline: none;
`;

const type = "audio";

const AudioInput: FunctionComponent<any> = ({ onComplete, editor }) => {
  const [url, setUrl] = useState("");

  return (
    <StyledInput
      value={url}
      onChange={(e: any) => setUrl(e.target.value)}
      onKeyUp={(e: any) => {
        if (e.keyCode == 13) {
          onComplete();
          // if the url is not empty
          if (url) {
            const isActive = hasBlock(editor.value, type);
            applyAudio(editor, isActive ? "paragraph" : type, url);
          } else {
            editor.focus();
          }
        }
      }}
      type="text"
      placeholder="Type something and press enter"
    />
  );
};

export default AudioInput;
