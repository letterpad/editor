import React, { ReactChild } from "react";
/* eslint-disable react/prop-types */
const ListItemNode = ({
  attributes,
  children
}: {
  attributes: any;
  children: ReactChild;
}) => <li {...attributes}>{children}</li>;

export default ListItemNode;
