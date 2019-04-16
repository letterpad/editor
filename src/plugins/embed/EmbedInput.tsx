import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { hasBlock } from "../../helper/strategy";
import { insertEmbed } from "./EmbedUtils";
import { parseUrl } from "./EmbedUtils";
import { InputProps } from "../../components/Toolbar";

const Container = styled.div`
  width: 100%;
  display: flex;
  &:before {
    content: "‹›";
    font-size: x-large;
    display: flex;
    align-items: center;
    margin-top: 0px;
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

              const embedObj = parseUrl(url);
              if (embedObj && Object.keys(embedObj).length > 0) {
                const isActive = hasBlock((editor as any).value, type);
                insertEmbed(editor, isActive ? "p" : type, embedObj);
              } else {
                editor.focus();
              }
            }
          }}
          type="text"
          placeholder="Paste a youtube or vimeo video link or an embed code and press Enter"
        />
      </Container>
    );
  }
);

export default VideoInput;
