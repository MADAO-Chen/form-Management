const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('network', resolve('src/network'))
            .set('views', resolve('src/views'))
        // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://121.36.173.159:8081/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    }
}
