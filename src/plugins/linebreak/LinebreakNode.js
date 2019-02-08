import React from "react";
/* eslint-disable react/prop-types */
const LinebreakNode = ({ attributes, children }) => {
    return (
        <span
            {...attributes}
            style={{
                borderBottom: "2px solid #000",
                display: "block",
                opacity: 0.2
            }}
        >
            {children}
        </span>
    );
};

export default LinebreakNode;
