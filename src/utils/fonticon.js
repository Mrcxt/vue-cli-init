/*
 * @LastEditTime : 2019-12-30 19:20:47
 * @Description:
 * @Date: 2019-12-30 17:21:23
 * @Author: @虾哔哔
 */
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);

Vue.component("fontIcon", FontAwesomeIcon); //FontAwesome图标