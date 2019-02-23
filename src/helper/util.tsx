import React from "react";
import { EditorButton } from "../plugins";

export const mapPropsToComponents = (
  componentList: EditorButton[],
  props?: any
) => {
  return componentList.map((item, index) => {
    return <item.button {...item.props} {...props} key={index} />;
  });
};
