import React, { ReactElement } from "react";

export const mapPropsToComponents = (
  componentList: ReactElement[],
  props: any
) => {
  return componentList.map((item, index) => {
    return React.cloneElement(item, { ...props, key: index });
  });
};
