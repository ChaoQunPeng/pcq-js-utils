/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-05-22 16:19:06
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-22 16:22:41
 * @FilePath: /pcq-js-utils/src/is-empty/is-empty.js
 * @Description: 
 */
/**
 * 检查一个对象是否为空。
 * @param {any} obj - 要检查的对象，可以是数组或任何其他类型的对象。
 * @returns {boolean} - 如果对象为空，则返回true；否则返回false。
 */
export const isEmpty = obj => {
  // 检查obj是否为数组
  if (obj instanceof Array) {
    // 如果是数组，检查数组长度是否为0
    return obj.length == 0;
  } else {
    // 对于非数组对象，进行空值或空对象检查
    if (obj === null || obj === undefined || obj === '' || Object.keys(obj).length == 0) {
      // 如果是空值或空对象，返回true
      return true;
    } else {
      // 如果不是空值或空对象，返回false
      return false;
    }
  }
};