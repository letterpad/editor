import React from "react";

export const mapPropsToComponents = (componentList, props) => {
    return componentList.map(item => {
        return React.cloneElement(item, { ...props });
    });
};
