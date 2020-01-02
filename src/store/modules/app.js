/*
 * @LastEditTime : 2020-01-02 14:26:29
 * @Description:
 * @Date: 2019-12-05 16:28:09
 * @Author: @虾哔哔
 */
import request from "@/api/modules/app";

export default {
    namespaced: false,
    state: {
        collapseSwitch: false,
        token: null,
    },
    getters: {
        collapseSwitch: state => state.collapseSwitch,
        token: state => state.token,
    },
    mutations: {
        TOGGLE_COLLAPSE_SWITCH(state, val) {
            state.collapseSwitch = val;
        },
        SET_TOKEN(state, val) {
            state.token = val;
        },
    },
    actions: {
        getToken({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                request
                    .getToken(params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

    }
};