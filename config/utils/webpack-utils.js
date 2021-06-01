/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')

const { TS_CONFIG_PATH, PRETTIER_CONFIG_PATH } = require('./paths')

const useTypeScript = () => fs.existsSync(TS_CONFIG_PATH)
// 此处仅考虑prettier.config.js类型配置文件，其他类型文件可自行修改
const usePrettier = () => fs.existsSync(PRETTIER_CONFIG_PATH)

module.exports = {
    useTypeScript,
    usePrettier,
}
