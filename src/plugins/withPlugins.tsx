import { EditorPlugin } from "@draft-js-plugins/editor";
import { EditorProps, TypeMediaCallback } from "../types";
import { getPlugins } from ".";

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

    const plugins = getPlugins();

    return (
      <WrappedComponent
        {...(props as T)}
        {...pluginCallbacks}
        plugins={plugins.pluginsArray}
        pluginHelpers={plugins.pluginsMap}
      />
    );
  };
  return Component;
};

export default withPlugins;
