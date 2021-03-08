const path = require('path')
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === 'production';
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 代码压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 代码分析
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

// 打包进度条，打包时间
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

// 【构建优化】使用缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  parallel: true,
  publicPath: './',
  productionSourceMap: false, // 关闭productionSourceMap
  chainWebpack: config => {
    // 别名F
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_a', resolve('src/assets'))
      .set('_u', resolve('src/utils'))
      .set('_font', resolve('src/assets/font'))
      .set('_css', resolve('src/assets/css'))
      .set('_img', resolve('src/assets/img'))
      .set('_v', resolve('src/views'))
      .set('_api', resolve('src/api'))


    // vuecli 3默认开启 prefetch(预先加载模块)，提前获取用户未来可能会访问的内容
    // 在首屏会把这十几个路由文件，都一口气下载了,所以我们要关闭这个功能（移除prefetch插件）
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');

    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end();
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin，默认false
    extract: isProd ? {
      ignoreOrder: true
    } : false,
    
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 这里是配置项，详见官方文档
            rootValue: 16, // 换算的基数
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    port: 8080
  },
  pluginOptions: {
    'style-resources-loader': {
      'preProcessor': 'less',
      'patterns': [
        resolve('src/assets/css/common.less')
      ]
    }
  },
  configureWebpack: config => {
    // 打包进度条，打包时间统计
    config.plugins.push(
      new ProgressBarPlugin({
        format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      })
    )

    if (isProd) {
      // 打包后代码体积分析
      if (process.env.npm_config_report) {
        config.plugins.push(
          new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
            analyzerPort: 6666
          })
        )
      }
      // gzip代码压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 1024 * 10 // 超过4kb压缩
        })
      )

      // 添加DllReferencePlugin插件
      // config.plugins.push(
      //   new webpack.DllReferencePlugin({
      //     context: __dirname,
      //     manifest: require('./vendor-manifest.json')
      //   })
      // )

      // 使用缓存，提高构建时间（开发构建感觉效果一般，打包效果比较明显）
      config.plugins.push(
        new HardSourceWebpackPlugin()
      )
    }
  }
}