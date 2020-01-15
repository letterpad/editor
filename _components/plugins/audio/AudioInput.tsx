import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { hasBlock } from "../../helper/strategy";
import { applyAudio } from "./AudioUtils";
import { InputProps } from "../../_components/Toolbar";

const Container = styled.div`
  width: 100%;
  display: flex;
  &:before {
    content: "🎧";
    font-size: x-large;
    display: flex;
    align-items: center;
    margin-top: 4px;
    padding: 0 8px;
  }
`;

const StyledInput = styled.input`
  font-size: medium;
  width: 100%;
  border: none;
  outline: none;
`;

const type = "audio";

const AudioInput: FunctionComponent<any> = React.forwardRef(
  ({ onComplete, editor }: InputProps, ref) => {
    const [url, setUrl] = useState("");

    return (
      <Container>
        <StyledInput
          ref={ref}
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
          onKeyUp={(e: any) => {
            if (e.keyCode == 13) {
              onComplete();
              // if the url is not empty
              if (url) {
                const isActive = hasBlock((editor as any).value, type);
                applyAudio(editor, isActive ? "p" : type, url);
              } else {
                editor.focus();
              }
            }
          }}
          type="text"
          placeholder="Paste an Audio link and press Enter"
        />
      </Container>
    );
  }
);

export default AudioInput;
