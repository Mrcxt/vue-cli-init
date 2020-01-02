/*
 * @LastEditTime : 2020-01-02 14:25:33
 * @Description:
 * @Date: 2019-12-05 19:46:31
 * @Author: @虾哔哔
 */
import http from "../http";

export default {
    getToken() {
        let url = "/api/get_token";
        return http.post(url);
    }
};