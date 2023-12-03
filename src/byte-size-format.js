/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-13 19:14:45
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-11-15 14:24:30
 * @FilePath: /pcq-js-utils/src/js/byte-size-format.js
 * @Description: 字节转kb
 */

/**
 * 小于 1024B 单位返回B
 * 小于 1024KB 单位返回KB
 * 小于 1024MB 单位返回MB
 * 小于 1024GB 单位返回GB
 */
export const byteSizeFormat = function (B) {
    let KB = (B / 1024);
    let MB = (B / 1024 / 1024);
    let GB = (B / 1024 / 1024 / 1024);

    if (B < 1024) {
        return B.toFixed(0) + 'B';
    }
    else if (KB < 1024) {
        return KB.toFixed(2) + 'KB';
    }
    else if (MB < 1024) {
        return MB.toFixed(2) + 'MB';
    } else {
        return GB.toFixed(2) + 'GB';
    }
}