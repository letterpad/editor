import React, { Fragment } from "react";
import UnorderedListButton from "./UnorderedListButton";
import OrderedListButton from "./OrderedListButton";

// TODO(boopathi): import ListButtonBar.css -> or convert to Styled Components

const ListButtonBar = (props: any) => (
  <Fragment>
    <UnorderedListButton {...props} />
    <OrderedListButton {...props} />
  </Fragment>
);

export default ListButtonBar;
