const glob = require('glob')
const path = require('path')
const fs = require('fs')

const PAGES_PATH = path.resolve(__dirname, './src/pages')

function entries() {
    var entryFiles = glob.sync(PAGES_PATH + '/*/main.js')
    var map = {}
    entryFiles.forEach((filepath) => {
        var pageName = path.basename(path.dirname(filepath))
        var templatePath = path.dirname(filepath) + '/index.html'
        if (!fs.existsSync(templatePath)) {
          // 入口如果不配置直接使用
          templatePath = 'public/index.html'
        }
        map[pageName] = {
          entry: filepath,
          filename: `${pageName}.html`,
          template: templatePath,
          chunks: ['chunk-vendors', 'chunk-common', pageName]
        }
    })
    return map
}

module.exports = {
  pages: entries()
}
