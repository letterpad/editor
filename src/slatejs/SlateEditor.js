import { PropTypes } from "prop-types";
import React, { Component } from "react";

import classnames from "classnames";
import { isFunction } from "../helper/type-check";
import { cloneElement } from "../helper/clone";

class SlateEditor extends Component {
    state = {
        value: null
    };

    componentDidMount() {
        this.setState({ value: this.props.value });
    }

    onChange = ({ value }) => {
        this.setState({ value });
        const { onChange } = this.props;
        if (isFunction(onChange)) onChange(value);
    };

    changeState = state => {
        // this.setState(state);
        // this.props.onChange(state);
    };

    render() {
        if (!this.state.value) return <span />;
        const {
            children,
            style,
            className,
            plugins,
            onPaste,
            editorRef
        } = this.props;

        const childProps = {
            plugins,
            value: this.state.value,
            onChange: this.onChange,
            onPaste: onPaste,
            editor: editorRef,
            changeState: this.changeState
        };

        return (
            <div
                className={classnames("editor--root", className)}
                style={style}
            >
                {cloneElement(children, childProps)}
            </div>
        );
    }
}

SlateEditor.propTypes = {
    initialState: PropTypes.object,
    children: PropTypes.any,
    style: PropTypes.any,
    className: PropTypes.any,
    plugins: PropTypes.any,
    onChange: PropTypes.any,
    onPaste: PropTypes.any,
    value: PropTypes.any,
    editorChanged: PropTypes.func
};

export default SlateEditor;
