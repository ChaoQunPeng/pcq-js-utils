/*
 * @Date: 2023-05-03 13:22:23
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-05-03 13:22:28
 * @FilePath: /qf-tools/js/utils/fake-sleep.js
 * @Description: 延迟执行
 */

/**
 * @description: 延迟执行
 * @return {*}
 */
export const fakeSleep = (times) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, times);
    });
}