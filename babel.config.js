/*
 * @LastEditTime: 2019-12-04 15:57:58
 * @Description:
 * @Date: 2019-12-04 15:39:17
 * @Author: @虾哔哔
 */
const plugins = [];
// 生产环境移除console
if (process.env.NODE_ENV === "production") {
    plugins.push("transform-remove-console");
}

module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins
};