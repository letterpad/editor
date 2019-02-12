/* eslint-disable react/prop-types */
import React from "react";
import { pluginConfigs } from "../plugins";

const pluginsMap = { node: {}, mark: {} };

/*|------------------------------------------------------------------------------
 * create a map of plugins so that its easy to identify based on node/mark
 * {
 *   mark: {
 *     bold: {
 *       is: "b",
 *       plugin: { ...config }
        }
 *   },
 *   node: {
 *      blockquote: {
 *        is: "block-quote",
 *        plugin: { ...config }
 *      }
 *   }
 * }
 *|------------------------------------------------------------------------------*/
pluginConfigs.forEach(config => {
    if (!Array.isArray(config)) {
        config = [config];
    }
    config.forEach(plugin => {
        let { identifier, tag } = plugin;
        identifier.forEach(set => {
            pluginsMap[tag][set[1]] = {
                plugin,
                is: set[0]
            };
        });
    });
});

// Search from the pluginsMap and give back the node to render
export const renderNode = (props, editor, next) => {
    if (pluginsMap.node[props.node.type]) {
        const RenderNode = pluginsMap.node[props.node.type].plugin.render;
        return <RenderNode {...props} next={next} />;
    }
    return next();
};

// Search from the pluginsMap and give back the mark to render
export const renderMark = (props, editor, next) => {
    if (pluginsMap.mark[props.mark.type]) {
        const RenderMark = pluginsMap.mark[props.mark.type].plugin.render;
        return <RenderMark {...props} next={next} />;
    }
    return next();
};
