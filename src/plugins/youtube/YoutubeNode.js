import React from "react";

const YoutubeNode = ({ node, attributes, children }) => {
    return (
        <iframe
            {...attributes}
            id="ytplayer"
            type="text/html"
            width="640"
            height="360"
            src={node.data.get("src")}
            frameborder="0"
        >
            {children}
        </iframe>
    );
};

export default YoutubeNode;
