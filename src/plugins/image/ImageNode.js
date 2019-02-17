import React from "react";
import styled from "styled-components";

/* eslint-disable react/prop-types */

const Image = styled.img`
    display: block;
    max-width: 100%;
    box-shadow: ${props => (props.selected ? "0 0 0 4px #414142;" : "none")};
`;

const ImageNode = ({ attributes, node, editor, isFocused }) => {
    return (
        <div>
            <img
                src={node.data.get("src")}
                selected={isFocused}
                {...attributes}
            />
            <div>
                <small>dsac</small>
            </div>
        </div>
    );
};

export default ImageNode;
