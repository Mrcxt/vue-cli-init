/*
 * @LastEditTime: 2019-12-09 18:12:45
 * @Description:
 * @Date: 2019-12-05 19:11:59
 * @Author: @虾哔哔
 */

/*  */
const baseHttp = window.BASE_URL_CONFIG.baseHttp;
const baseWs = window.BASE_URL_CONFIG.baseWs;
const baseUrl = window.BASE_URL_CONFIG.baseUrl;

/*  */
let urls = baseHttp + baseUrl;
let wsUrls = baseWs + baseUrl;

export { urls, wsUrls };
