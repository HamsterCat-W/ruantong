// 全局配置

const path = require('path')
module.exports = {
    // eslint
    lintOnSave:false,
    // 开发服务器相关
    devServer: {
        // 设置代理，解决跨域
        //  proxy:{}
        // 设置开发服务器端口号
        port: 8888
    },
    // webpack相关配置
    configureWebpack: {
        // 解析
        resolve: {
            // 配置路径别名
            alias: {
                '@':path.resolve(__dirname,'src')
            }
        }
    }
}