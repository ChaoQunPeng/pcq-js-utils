/*
 * @Date: 2023-05-03 13:22:23
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-03 12:28:06
 * @FilePath: /pcq-js-utils/src/fake-sleep.js
 * @Description: 延迟执行
 */


/**
 * 一个模拟延时的函数，返回一个Promise对象。
 * @param {number} times 延时的时间，以毫秒为单位。
 * @returns {Promise} 返回一个解决（resolve）为true的Promise对象。
 */
export const fakeSleep = times => {
  // 创建一个新的Promise，它将在指定的times毫秒后解决
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true); // 在延时后，解决Promise
    }, times);
  });
};