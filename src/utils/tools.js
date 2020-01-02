/*
 * @LastEditTime : 2019-12-23 17:47:04
 * @Description:
 * @Date: 2019-12-23 17:38:19
 * @Author: @虾哔哔
 */

/**
 * @description 获取页面响应头信息
 * @export
 * @returns {Object} 响应头信息
 */
export function getAllResponseHeaders() {
  var req = new XMLHttpRequest();
  req.open("GET", document.location.href, false);
  req.send(null);
  var headerArr = req.getAllResponseHeaders().split("\n");
  var headers = {};
  headerArr.forEach(item => {
    if (item !== "") {
      var index = item.indexOf(":");
      var key = item.slice(0, index);
      var value = item.slice(index + 1).trim();
      headers[key] = value;
    }
  });
  return headers;
}
