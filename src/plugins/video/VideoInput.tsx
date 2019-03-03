import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { hasBlock } from "../../helper/strategy";
import { insertVideo } from "./VideoUtils";
import { parseUrl } from "./VideoUtils";

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

const type = "iframe";

const VideoInput: FunctionComponent<any> = React.forwardRef(
  ({ onComplete, editor }, ref) => {
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

              const parsedUrl = parseUrl(url);
              if (parsedUrl) {
                const isActive = hasBlock(editor.value, type);
                insertVideo(editor, isActive ? "paragraph" : type, parsedUrl);
              } else {
                editor.focus();
              }
            }
          }}
          type="text"
          placeholder="Paste a youtube or vimeo video link and press Enter"
        />
      </Container>
    );
  }
);

export default VideoInput;
