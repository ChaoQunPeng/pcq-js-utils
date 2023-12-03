/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-13 19:39:49
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-11-15 11:47:46
 * @FilePath: /pcq-js-utils/src/js/date-format.js
 * @Description: 格式化日期 
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

/**
 * @description: 格式化日期，就是以dayjs的封装
 * @param {*} value 日期格式，或者时间戳（秒）
 * @param {*} format 格式化类型，同dayjs
 * @return {*} 格式化的值
 */
export const dateFormat = function (value, format = 'YYYY-MM-DD') { 
    return value ? dayjs(value).format(format) : '—';
}