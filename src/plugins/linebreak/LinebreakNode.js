import React from "react";
import styled from "styled-components";
import { getAttributesFromNode } from "../../helper/util";

const Wrapper = styled.hr`
  margin: 40px auto;
  border: 0;
  text-align: center;
  overflow: visible;
  :before {
    font-weight: 400;
    font-style: italic;
    font-size: 30px;
    letter-spacing: 0.6em;
    content: "...";
    display: block;
    margin-left: 0.6em;
    position: relative;
    top: -4px;
  }
`;

const LinebreakNode = ({ attributes, children, node }) => {
  const props = getAttributesFromNode(node);
  return <Wrapper {...attributes} {...props} />;
};

export default LinebreakNode;
