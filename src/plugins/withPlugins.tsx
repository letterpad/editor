import { EditorPlugin } from "@draft-js-plugins/editor";
import { PluginsMap } from "@src/types";
import { EditorProps, TypeMediaCallback } from "@src/types";
import { getPlugins } from ".";

export interface WithPluginProps {
  plugins: EditorPlugin[];
  pluginsMap: PluginsMap;
  onImageClick: TypeMediaCallback;
}
const plugins = getPlugins();
const withPlugins = <T extends EditorProps = EditorProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const Component = (props: EditorProps) => {
    const pluginCallbacks = {
      onImageClick: props.onImageClick,
    };

    return (
      <WrappedComponent
        {...(props as T)}
        {...pluginCallbacks}
        plugins={plugins.pluginsArr}
        pluginsMap={plugins.pluginsMap}
      />
    );
  };
  return Component;
};

export default withPlugins;
