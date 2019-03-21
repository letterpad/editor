import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";

import Gallery from "./Gallery";

const Container = styled.div`
  width: 100%;
  display: flex;
  &:before {
    content: "";
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
  ({ onComplete, editor }, ref) => {
    const [query, setQuery] = useState("");

    if (query !== "" && editor) {
      return <Gallery onComplete={onComplete} query={query} editor={editor} />;
    }

    return (
      <Container>
        <StyledInput
          ref={ref}
          onKeyUp={(e: any) => {
            if (e.keyCode == 13) {
              setQuery(e.target.value);
            }
          }}
          type="text"
          placeholder="Enter a keyword for gifs"
        />
      </Container>
    );
  }
);

export default ImageInput;
