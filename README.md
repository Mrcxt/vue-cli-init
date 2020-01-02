<!--
 * @LastEditTime : 2020-01-02 12:04:51
 * @Description:
 * @Date: 2019-12-04 16:19:28
 * @Author: @虾哔哔
 -->

- [开始](#%e5%bc%80%e5%a7%8b)
- [风格指南](#%e9%a3%8e%e6%a0%bc%e6%8c%87%e5%8d%97)
  - [单文件组件文件名称](#%e5%8d%95%e6%96%87%e4%bb%b6%e7%bb%84%e4%bb%b6%e6%96%87%e4%bb%b6%e5%90%8d%e7%a7%b0)
  - [紧密耦合的组件名](#%e7%b4%a7%e5%af%86%e8%80%a6%e5%90%88%e7%9a%84%e7%bb%84%e4%bb%b6%e5%90%8d)
  - [代码拆分](#%e4%bb%a3%e7%a0%81%e6%8b%86%e5%88%86)
- [CSS 相关](#css-%e7%9b%b8%e5%85%b3)
  - [变量命名](#%e5%8f%98%e9%87%8f%e5%91%bd%e5%90%8d)
  - [预处理器](#%e9%a2%84%e5%a4%84%e7%90%86%e5%99%a8)
  - [全局 CSS 变量](#%e5%85%a8%e5%b1%80-css-%e5%8f%98%e9%87%8f)
  - [全局 CSS 样式](#%e5%85%a8%e5%b1%80-css-%e6%a0%b7%e5%bc%8f)
  - [图标](#%e5%9b%be%e6%a0%87)
- [自动注册](#%e8%87%aa%e5%8a%a8%e6%b3%a8%e5%86%8c)
  - [vue 组件注册](#vue-%e7%bb%84%e4%bb%b6%e6%b3%a8%e5%86%8c)
  - [vuex modules 注册](#vuex-modules-%e6%b3%a8%e5%86%8c)
- [Git commits 提交规范](#git-commits-%e6%8f%90%e4%ba%a4%e8%a7%84%e8%8c%83)
- [全局工具库/函数](#%e5%85%a8%e5%b1%80%e5%b7%a5%e5%85%b7%e5%ba%93%e5%87%bd%e6%95%b0)
- [请求](#%e8%af%b7%e6%b1%82)
- [console.log 相关](#consolelog-%e7%9b%b8%e5%85%b3)

## 开始

```bash
yarn

yarn dev //

yarn build //
```

## 风格指南

### 单文件组件文件名称

单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。

```
// bad
mycomponent.vue
myComponent.vue

// good
my-component.vue
MyComponent.vue //本项目使用的命名规则
```

> 本项目使用 **驼峰命名**

### 紧密耦合的组件名

和父组件紧密耦合的子组件应该以父组件名作为前缀命名。

```
// bad
components/
|- TodoList.vue
|- TodoItem.vue
└─ TodoButton.vue

// good
components/
|- TodoList.vue
|- TodoListItem.vue
└─ TodoListItemButton.vue
```

### 代码拆分

拆分原则，同一页面内的多个模块，按照功能业务拆分为多个单文件，利于代码维护，方便管理。

> 禁止单文件内代码臃肿。

## CSS 相关

### 变量命名

命名原则遵循 **BFM 命名规则**

### 预处理器

本项目使用 `less` 作为 CSS 预处理器。

一个 vue 文件中，如无特殊情况，禁止添加多个 `<style>` 标签。

> 如需修改组件内样式，使用 `/deep/` 进行 CSS 穿透。

### 全局 CSS 变量

`./src/style/var.less`中的变量为全局变量，所有 vue 文件中均可使用，无需重复引用

> 全局样式**必须保持统一**，单文件中优先使用全局样式变量。

### 全局 CSS 样式

添加全局样式需在统一的 less 文件或 App.vue 中添加

> 禁止在单文件中添加全局样式

### 图标

内置 Font Awosome 5 图标，使用方法 `<font-icon icon="chess-knight" />`

[图标查阅地址](https://fontawesome.com/icons?d=listing&s=solid&m=free)

> 仅可使用 Free + Solid 类目下的图标

## 自动注册

### vue 组件注册

全局组件放置在 `./src/components/baseComponents` 中会被自动注册，无需处理，非全局组件请勿放置在此目录中

### vuex modules 注册

放置在`./src/store/modules`中的 modules 会被自动注册，无需处理

## Git commits 提交规范

需按照标准规范提交，具体参考[Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html).

> 本项目可以使用 `git cz` 代替 `git commit` 命令。

## 全局工具库/函数

以下工具库可以全局使用，包括任何 **js/vue** 文件中。

`<调用名称>:<引入库>`

> 完整列表请查看 `vue.config.js` 中的 `ProvidePlugin` 字段。

如需其他全局库，可在该字段下添加，也可注册在 Vue.prototype 中，视情况而定。

```js
{
    _: "lodash", //等同于 import _ from 'lodash'
    dayjs: "dayjs",
    jsCookie: "js-cookie",
    jsBase64: ["js-base64", "Base64"], // 等同于 import {Base64} from 'js-base64'
    uuid: "uuid/v1",
    xss: "xss"
}
```

## 请求

> 所有请求必须经过 vuex 调用

## console.log 相关

生产环境中的`console.log`会被清除，如需在生产环境中保留，请使用`window.console.log`
