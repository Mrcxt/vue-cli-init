/*
 * @LastEditTime : 2019-12-31 09:58:56
 * @Description:
 * @Date: 2019-12-04 16:19:28
 * @Author: @虾哔哔
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./components/baseComponents/baseComponents.js"; // 自动化注册全局组件
import pickerOptions from "@/utils/pickerOptions.js";
import "./utils/fonticon"; // FontAwesome图标

/* lib */
import ElementUI from "element-ui";

/*  utils */
Vue.prototype.$pickerOptions = pickerOptions;

/* install */
Vue.use(ElementUI, {
  size: "mini"
});

/* css */
import "normalize.css";
import "@/style/theme/index.css";
import "@/style/elemen-reset.less";
import "@/style/toolcss/index.less";

console.log("%c环境变量：", "color:green;", process.env);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
