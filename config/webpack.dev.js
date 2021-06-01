/* eslint-disable @typescript-eslint/no-var-requires */

const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { DEMO_HTML, DEMO_INDEX_PATH, BUILD_PATH } = require('./utils/paths')

function webpackDevChainFn(config) {
    if (process.env.NODE_ENV === 'development') {
        config
            // 修改 entry 配置
            .entry('index')
            .add(DEMO_INDEX_PATH)
            .end()

            // 修改 output 配置
            .output.path(BUILD_PATH)
            .filename('[name].[contenthash:8].js')
            .chunkFilename('[name].[contenthash:8].js')
            // webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
            .publicPath('/')

        config.mode('development').devtool('eval-source-map')
        config
            .plugin('DefinePlugin')
            .use(Webpack.DefinePlugin, [
                {
                    'process.env.NODE_ENV': JSON.stringify(
                        process.env.NODE_ENV,
                    ),
                },
            ])
            .end()
            .plugin('HtmlWebpackPlugin')
            .use(HtmlWebpackPlugin, [
                {
                    filename: 'index.html',
                    template: DEMO_HTML,
                    inject: 'body',
                    minify: false,
                },
            ])

        // 美化进度条
        config.plugin('WebpackBar').use(WebpackBar)

        // 美化dashboard
        config
            .plugin('FriendlyErrorsWebpackPlugin')
            .use(FriendlyErrorsWebpackPlugin)
            .end()

        // config.plugin('WebpackHRM').use(Webpack.HotModuleReplacementPlugin)
    }
}

module.exports = webpackDevChainFn
