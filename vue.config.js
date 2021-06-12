// const CompressionPlugin = require('compression-webpack-plugin')
const url = 'http://cloud.ling2.cn:9999/'
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
// vue.config.js
module.exports = {
    /*
      Vue-cli3:
      Crashed when using Webpack `import()` #2463
      https://github.com/vuejs/vue-cli/issues/2463
     */
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    
    productionSourceMap: false,


    //打包app时放开该配置
    // publicPath:'/zct',
    
    configureWebpack: config => {
        //生产环境取消 console.log
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
        //生产环境，开启js\css压缩
            // if (process.env.NODE_ENV === 'production') {
            //     config.plugin('compressionPlugin').use(new CompressionPlugin({
            //         test: /\.js$|.\css|.\less/, // 匹配文件名
            //         threshold: 10240, // 对超过10k的数据压缩
            //         deleteOriginalAssets: false // 不删除源文件
            //     }))
            // }

        // 配置 webpack 识别 markdown 为普通的文件
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use()
            .loader('file-loader')
            .end()
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        browsers: ['Android >= 4.0', 'iOS >= 8'],
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    },
    devServer: {
        https: true,
        proxy: {
            '/zctapi': {
                target: 'https://beta.zoolife.cn/',
                ws: true,
                pathRewrite: {
                    // '/zctapi/': '/'
                }
            },
            '/v1': {
                target: 'https://beta.zoolife.cn/',
                ws: true,
                pathRewrite: {
                    // '/zctapi/': '/'
                }
            },
        },
    }
}