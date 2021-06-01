/* eslint-disable @typescript-eslint/no-var-requires */
const { useTypeScript } = require('./config/utils/webpack-utils')

module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV === 'development')

    const presets = [['@babel/preset-env']]
    if (useTypeScript) {
        presets.push('@babel/preset-typescript')
    }
    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3,
            },
        ],
    ]

    return { presets, plugins }
}
