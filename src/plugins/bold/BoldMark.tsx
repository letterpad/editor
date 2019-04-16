import React, { SFC } from "react";

/* eslint-disable react/prop-types */
const BoldMark: SFC = ({ children }) => (
  <strong data-id="plugin-bold">{children}</strong>
);

export default BoldMark;
