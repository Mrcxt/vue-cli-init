/*
 * @LastEditTime : 2020-01-02 14:24:45
 * @Description:
 * @Date: 2019-12-05 19:08:38
 * @Author: @虾哔哔
 */
import axios from "axios";
import router from "../router";
import store from "../store";
import {
    urls
} from "./config";
import {
    Message
} from "element-ui";

// axios配置
axios.defaults.baseURL = urls;
axios.defaults.headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=utf-8"
};
axios.defaults.withCredentials = true; //是否携带cookie
axios.defaults.timeout = 15000; //超时时间

//
axios.interceptors.request.use(
    config => {
        let token = store.state.app.token;
        if (token) {
            config.headers["Authorization"] = token; //每个请求都带上token
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//
axios.interceptors.response.use(
    res => {

        return res;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    error.message = "未授权";
                    router.push("/login");
                    break;

                default:
                    break;
            }
        }
        console.log(error);
        return Promise.reject(error);
    }
);

export default {
    get(url, params = {}) {
        return axios.get(url, {
            params: params
        });
    },
    post(url, data, config) {
        return axios.post(url, data, config);
    },
    put(url, data) {
        return axios.put(url, data);
    },
    delete(url, params = {}) {
        return axios.delete(url, {
            params: params
        });
    }
};