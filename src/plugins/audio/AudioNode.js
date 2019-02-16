import React from "react";

const AudioNode = ({ node, attributes, children }) => {
    return (
        <audio {...attributes} controls src={node.data.get("src")}>
            {children}
        </audio>
    );
};

export default AudioNode;
