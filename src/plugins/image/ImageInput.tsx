import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { insertImage } from "./ImageUtils";

const Container = styled.div`
  width: 100%;
  display: flex;
  &:before {
    content: "📷";
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

const ImageInput: FunctionComponent<any> = React.forwardRef(
  ({ onComplete, editor, node }, ref) => {
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
              let align = "center";
              let title = "";
              // if the url is not empty
              if (node && node.data) {
                align = node.data.get("align");
                title = node.data.get("title");
              }
              if (url) {
                insertImage(editor, url, align, title);
              } else {
                editor.focus();
              }
            }
          }}
          type="text"
          placeholder="Paste an Image link and press Enter"
        />
      </Container>
    );
  }
);

export default ImageInput;
