/*
 * @LastEditTime : 2020-01-02 14:25:08
 * @Description:
 * @Date: 2019-12-04 15:39:17
 * @Author: @虾哔哔
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "./layout";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    ...Layout,
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/Login/Login.vue"),
        meta: {
            title: "登陆",
            isShow: false
        }
    },
    {
        path: "*",
        name: "404",
        component: () =>
            import ("@/views/404/404.vue"),
        meta: {
            title: "404",
            isShow: false
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    // 切换路由后页面滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});

//
router.beforeEach((to, from, next) => {
    //
    // console.log(to);
    if (store.state.app.token) {
        if (to.name === "login") {
            next("/");
        }
    } else {
        if (to.name !== "login") {
            next({
                name: "login"
            });
        }
    }

    next();
});

router.afterEach((to, from) => {
    console.log(to);
    document.title = to.meta.title;
});

export default router;