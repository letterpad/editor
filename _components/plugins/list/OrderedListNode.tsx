import React, { DetailedHTMLProps, HTMLAttributes, ReactChild } from "react";

const OrderedListNode = ({
  attributes,
  children
}: {
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  >;
  children: ReactChild;
}) => <ol {...attributes}>{children}</ol>;

export default OrderedListNode;
