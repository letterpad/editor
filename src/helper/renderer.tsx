/* eslint-disable react/prop-types */
import React, { ReactNode } from "react";
import { pluginsMap } from "../plugins";
import { Editor } from "slate";

export interface RenderProps {
  node: {
    type: string;
  };
  mark: {
    type: string;
  };
}

export interface RenderCallback {
  (params: { renderType: string; type: string; props: RenderProps }):
    | ReactNode
    | undefined;
}

export interface RenderHandler {
  (
    props: RenderProps,
    editor: Editor,
    next?: () => ReactNode,
    callbacks?: {
      [key: string]: RenderCallback;
    }
  ): ReactNode;
}

// Search from the pluginsMap and give back the node to render
export const renderNode: RenderHandler = (props, _, next, callbacks) => {
  if (pluginsMap.node[props.node.type]) {
    const RenderNode = pluginsMap.node[props.node.type].plugin.render;
    if (callbacks && callbacks.onBeforeRender) {
      callbacks.onBeforeRender({
        renderType: "node",
        type: props.node.type,
        props
      });
    }
    return <RenderNode {...props} next={next} />;
  }
  return next && next();
};

// Search from the pluginsMap and give back the mark to render
export const renderMark: RenderHandler = (props, _, next, callbacks) => {
  if (pluginsMap.mark[props.mark.type]) {
    const RenderMark = pluginsMap.mark[props.mark.type].plugin.render;
    if (callbacks && callbacks.onBeforeRender) {
      const onBeforeRender = callbacks.onBeforeRender({
        renderType: "mark",
        type: props.mark.type,
        props
      });
      if (onBeforeRender) return onBeforeRender;
    }
    return <RenderMark {...props} next={next} />;
  }
  return next && next();
};
