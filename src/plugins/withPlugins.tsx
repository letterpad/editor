import { EditorPlugin } from "@draft-js-plugins/editor";
import { EditorProps, TypeMediaCallback } from "../types";
import { PluginNames, getPlugins } from "./init";

export interface WithPluginProps {
  plugins: EditorPlugin[];
  onImageClick: TypeMediaCallback;
  onVideoClick: TypeMediaCallback;
}

const withPlugins = <T extends EditorProps = EditorProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const Component = (props: EditorProps) => {
    const pluginCallbacks = {
      onImageClick: props.onImageClick,
      onVideoClick: props.onVideoClick,
    };

    const ignoreList: PluginNames[] = [];
    const plugins = getPlugins(ignoreList);

    return (
      <WrappedComponent
        {...(props as T)}
        {...pluginCallbacks}
        plugins={plugins}
      />
    );
  };
  return Component;
};

export default withPlugins;
