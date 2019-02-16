import React from "react";

export const mapPropsToComponents = (componentList, props) => {
    return componentList.map((item, index) => {
        return React.cloneElement(item, { ...props, key: index });
    });
};
