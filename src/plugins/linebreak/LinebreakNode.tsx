import React from "react";
import styled from "styled-components";
import { getAttributesFromNode } from "../../helper/util";

const Wrapper = styled.hr`
  margin: 40px auto;
  border: 0px !important;
  text-align: center;
  overflow: visible;
  line-height: 0px;
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

const LinebreakNode = ({
  attributes,
  node
}: {
  attributes: any;
  node: any;
}) => {
  const props = getAttributesFromNode(node);
  return <Wrapper data-id="plugin-linebreak" {...attributes} {...props} />;
};

export default LinebreakNode;
