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
export const pluginsMap = { node: {}, mark: {} };

// Apply plugins
export const plugins = [
    // PluginPrism({
    //     onlyIn: node => node.type === "code_block",
    //     getSyntax: node => node.data.get("syntax")
    // }),
    // // ImagePlugin(),
    // // MarkdownPlugin(),
];

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
        let { identifier, tag } = plugin;
        identifier.forEach(set => {
            pluginsMap[tag][set[1]] = {
                plugin,
                is: set[0]
            };
        });
    });
});
