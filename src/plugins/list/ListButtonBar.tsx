import React, { Fragment } from "react";
import UnorderedListButton from "./UnorderedListButton";
import OrderedListButton from "./OrderedListButton";

// FIXME: Needs to handle assets files to work with SSR
if (require("exenv").canUseDOM) {
  require("./ListButtonBar.css");
}

const ListButtonBar = (props: any) => (
  <Fragment>
    <UnorderedListButton {...props} />
    <OrderedListButton {...props} />
  </Fragment>
);

export default ListButtonBar;
