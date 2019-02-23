import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

const OrderedListNode = ({
  attributes,
  children
}: {
  attributes: DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >;
  children: ReactElement;
}) => <ul {...attributes}>{children}</ul>;

export default OrderedListNode;
