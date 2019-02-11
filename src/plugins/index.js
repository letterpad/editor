export const pluginConfigs = (ctx => {
    let keys = ctx.keys();
    let values = keys.map(ctx);
    return keys.reduce((o, k, i) => {
        o.push(values[i].default);
        return o;
    }, []);
})(require.context(".", true, /config.js/));
