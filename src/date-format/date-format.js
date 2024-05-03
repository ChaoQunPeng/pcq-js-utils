/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-13 19:39:49
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-03 13:39:10
 * @FilePath: /pcq-js-utils/src/date-format/date-format.js
 * @Description: 格式化日期
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

/**
 * 格式化日期
 * @param {String|Number|Date} value - 需要格式化的日期，可以是字符串、数字或日期对象
 * @param {String} format - 日期格式，默认为 'YYYY-MM-DD'
 * @returns {String} 返回格式化后的日期字符串，如果输入值为假值，则返回 '—'
 */
export const dateFormat = function (value, format = 'YYYY-MM-DD', emptyText = '—') {
  // 使用 dayjs 对象格式化日期
  return value ? dayjs(value).format(format) : emptyText;
};