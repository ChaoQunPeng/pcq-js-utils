/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-13 18:55:00
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-03 12:32:59
 * @FilePath: /pcq-js-utils/src/recursion-array.js
 * @Description: 递归操作
 */



/**
 * 递归处理数组中的每个元素及其子元素，对每个元素执行回调函数
 * @param {Array} array - 待处理的数组
 * @param {Function} cb - 对每个元素执行的回调函数
 * @param {Object} [config] - 配置对象，可选
 * @param {String} [config.children] - 子元素属性的键名，默认为'children'
 */
export const recursionArray = (array, cb, config) => {
    // 处理配置对象，默认值为{children: 'children'}
    let cfg = config ? config : {
        children: 'children',
    };

    // 定义递归函数
    let fn = (arr) => {
        arr.forEach((e, i) => {
            cb(e, i); // 对当前元素执行回调

            // 如果当前元素含有子元素且子元素数组不为空，则对子元素递归调用fn
            if (e[cfg.children] && e[cfg.children].length > 0) {
                fn(e[cfg.children]);
            }
        });
    }

    fn(array); // 对传入的数组开始递归处理
}


/**
 * 递归处理数组中的每个元素，从子元素开始处理
 * @param {Array} array - 待处理的数组
 * @param {Function} cb - 对每个元素执行的回调函数
 * @param {Object} [config] - 配置对象，可选
 * @param {String} [config.children] - 子元素属性的键名，默认为'children'
 */
export const recursionTrailArray = (array, cb, config) => {
    // 处理配置对象，默认值为{children: 'children'}
    let cfg = config ? config : {
        children: 'children',
    };

    // 定义递归函数
    let fn = (arr) => {
        arr.forEach((e, i) => {

            // 如果当前元素含有子元素且子元素数组不为空，则对子元素递归调用fn
            if (e[cfg.children] && e[cfg.children].length > 0) {
                fn(e[cfg.children]);
            }

            cb(e); // 对当前元素执行回调
        });
    }

    fn(array); // 对传入的数组开始递归处理
}