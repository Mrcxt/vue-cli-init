/*
 * @LastEditTime : 2019-12-24 16:14:55
 * @Description:
 * @Date: 2019-12-04 15:39:17
 * @Author: @虾哔哔
 */

const webpack = require("webpack");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  outputDir: "dist", // build 包名 
  assetsDir: "static", // 静态文件地址
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    // .set("assets", resolve("src/assets"))
    // .set("components", resolve("src/components"))
    // .set("views", resolve("src/views"))
    // .set("static", resolve("src/static"));
  },
  configureWebpack: config => {
    config.plugins.push(
      /**
       * @description 添加全局函数
       * 以下模块均可全局使用，无需重复引入
       */
      new webpack.ProvidePlugin({
        _: "lodash", //等同于 import _ from 'lodash'
        dayjs: "dayjs",
        jsCookie: "js-cookie",
        jsBase64: ["js-base64", "Base64"], // 等同于 import {Base64} from 'js-base64'
        uuid: "uuid/v1",
        xss: "xss"
      })
    );
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/style/var.less")]
    }
  }
};
