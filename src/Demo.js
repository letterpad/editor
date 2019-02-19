import App from "./App";

import React, { Component } from "react";

class Demo extends Component {
    onButtonClick = (e, type) => {
        console.log(type);
    };

    onBeforeRender = props => {
        if (props.type == "strong") {
            return <h3>hello</h3>;
        }
    };

    render() {
        return (
            <App
                onButtonClick={this.onButtonClick}
                onBeforeRender={this.onBeforeRender}
            />
        );
    }
}

export default Demo;
