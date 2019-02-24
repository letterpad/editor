import React, { SFC } from "react";

/* eslint-disable react/prop-types */
const highlightMark: SFC = ({ children }) => {
  return <code>{children}</code>;
};

export default highlightMark;
