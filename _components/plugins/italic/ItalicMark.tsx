import React, { SFC } from "react";

/* eslint-disable react/prop-types */
const ItalicMark: SFC = ({ children }) => (
  <em data-id="plugin-italic">{children}</em>
);

export default ItalicMark;
