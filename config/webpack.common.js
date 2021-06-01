/* eslint-disable @typescript-eslint/no-var-requires */
const { SRC_PATH, moduleFileExtensions } = require('./utils/paths')
const { useTypeScript } = require('./utils/webpack-utils')

function webpackCommonChainFn(config) {
    config.resolve.extensions
        .merge(
            moduleFileExtensions
                .map((ext) => `.${ext}`)
                .filter((ext) => useTypeScript || !ext.includes('ts')),
        )
        .end()
        .alias.set('@', SRC_PATH)

    // 创建一个具名规则，以后用来修改规则
    config.module
        .rule('compile')
        .test(/\.(js|ts)$/)
        .exclude.add(/node_modules/)
        .end()
        .use('babel')
        .loader('babel-loader')

    config.module
        .rule('asset')
        .test(/\.(svg|png|jpe?g|gif|mp3|mp4)$/)
        .use('asset-loader')
        .loader('url-loader')
        .options({
            limit: 8192,
        })

    config.module
        .rule('font')
        .test(/\.(woff2?|eot|ttf|otf)$/i)
        .use('font-loader')
        .loader('file-loader')
        .options({
            limit: 8192,
        })

    config.module
        .rule('style')
        .test(/\.(sa|sc|c)ss$/)
        .use('style-loader')
        .loader('style-loader')
        .end()
        .use('css')
        .loader('css-loader')
        .end()
        .use('postcss')
        .loader('postcss-loader')
        .end()
        .use('sass')
        .loader('sass-loader')
}

module.exports = webpackCommonChainFn
