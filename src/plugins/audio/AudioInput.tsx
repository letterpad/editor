import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { hasBlock } from "../../helper/strategy";
import { applyAudio } from "./AudioUtils";

const StyledInput = styled.input`
  font-size: larger;
  width: 100%;
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
          const isActive = hasBlock(editor.value, type);
          applyAudio(editor, isActive ? "paragraph" : type, url);
        }
      }}
      type="text"
      placeholder="Type something and press enter"
    />
  );
};

export default AudioInput;
