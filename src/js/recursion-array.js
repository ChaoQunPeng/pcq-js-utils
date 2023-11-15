/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-13 18:55:00
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-11-13 19:12:30
 * @FilePath: /pcq-js-utils/src/js/recursion-array.js
 * @Description: 递归操作
 */


/**
 * 递归数组，抛出每个节点
 */
export const recursionArray = (array, cb, config) => {
    let cfg = config ? config : {
        children: 'children',
    };

    let fn = (arr) => {
        arr.forEach((e, i) => {
            cb(e, i);

            if (e[cfg.children] && e[cfg.children].length > 0) {
                fn(e[cfg.children]);
            }
        });
    }

    fn(array);
}

/**
 * 尾部递归数组，抛出每个节点
 */
export const recursionTrailArray = (array, cb, config) => {
    let cfg = config ? config : {
        children: 'children',
    };

    let fn = (arr) => {
        arr.forEach((e, i) => {

            if (e[cfg.children] && e[cfg.children].length > 0) {
                fn(e[cfg.children]);
            }

            cb(e)
        });
    }

    fn(array);
}