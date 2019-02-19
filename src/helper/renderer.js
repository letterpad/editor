/* eslint-disable react/prop-types */
import React from "react";
import { pluginsMap } from "../plugins";

// Search from the pluginsMap and give back the node to render
export const renderNode = (props, editor, next, callbacks) => {
    if (pluginsMap.node[props.node.type]) {
        const RenderNode = pluginsMap.node[props.node.type].plugin.render;
        if (callbacks.onBeforeRender) {
            callbacks.onBeforeRender({
                renderType: "node",
                type: props.node.type,
                props
            });
        }
        return <RenderNode {...props} next={next} />;
    }
    return next();
};

// Search from the pluginsMap and give back the mark to render
export const renderMark = (props, editor, next, callbacks) => {
    if (pluginsMap.mark[props.mark.type]) {
        const RenderMark = pluginsMap.mark[props.mark.type].plugin.render;
        if (callbacks.onBeforeRender) {
            const onBeforeRender = callbacks.onBeforeRender({
                renderType: "mark",
                type: props.mark.type,
                props
            });
            if (onBeforeRender) return onBeforeRender;
        }
        return <RenderMark {...props} next={next} />;
    }
    return next();
};
