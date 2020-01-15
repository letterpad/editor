import React, { SFC } from "react";

const UnderlineMark: SFC = ({ children }) => (
  <u data-id="plugin-underline">{children}</u>
);

export default UnderlineMark;
