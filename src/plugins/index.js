import AutoReplace from "slate-auto-replace";

// import { ImageButton, ImagePlugin } from "./image";
// import { MarkdownPlugin } from "./markdown";

export const pluginConfigs = (ctx => {
    let keys = ctx.keys();
    let values = keys.map(ctx);
    return keys.reduce((o, k, i) => {
        o.push(values[i].default);
        return o;
    }, []);
})(require.context(".", true, /config.js/));

export const menuButtons = [];
export const toolbarButtons = [];
export const pluginsMap = { node: {}, mark: {}, inline: {} };

// Apply plugins
export const plugins = [
    // PluginPrism({
    //     onlyIn: node => node.type === "code_block",
    //     getSyntax: node => node.data.get("syntax")
    // }),
    // // ImagePlugin(),
    // // MarkdownPlugin(),
];
window.plugins = plugins;
pluginConfigs.forEach(config => {
    if (!Array.isArray(config)) {
        config = [config];
    }
    config.forEach(plugin => {
        const _menuButtons = plugin.menuButtons;
        if (Array.isArray(_menuButtons)) {
            _menuButtons.forEach(b => menuButtons.push(b));
        }
        const _toolbarButtons = plugin.toolbarButtons;
        if (Array.isArray(_toolbarButtons)) {
            _toolbarButtons.forEach(b => toolbarButtons.push(b));
        }
        if (plugin.main) {
            plugins.push(plugin.main());
        }
        if (plugin.markdown) {
            plugins.push(AutoReplace(plugin.markdown));
        }

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
        *        is: "blockquote",
        *        plugin: { ...config }
        *      }
        *   }
        * }
        *|------------------------------------------------------------------------------*/
        let { identifier, tag } = plugin;
        identifier.forEach(id => {
            pluginsMap[tag][id] = {
                plugin,
                is: id
            };
        });
    });
});
