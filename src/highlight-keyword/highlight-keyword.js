/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-05-04 11:41:00
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-04 11:42:21
 * @FilePath: /pcq-js-utils/src/highlight-keyword/highlight-keyword.js
 * @Description: 
 */
/**
 * 高亮列表中与关键字匹配的项。
 * @param {Array} list - 需要处理的列表，列表中的每一项都应该是一个对象。
 * @param {String} keyword - 需要高亮显示的关键字。
 * @param {Object} config - 可选的配置对象，用于自定义高亮行为。
 * @param {String} [config.key='name'] - 列表项中需要被搜索和高亮的键名。
 * @param {String} [config.className='hight-light'] - 用于高亮文本的CSS类名。
 * @param {String} [config.style=''] - 应用于高亮文本的内联样式。
 * @param {Boolean} [config.isReplaceAll=true] - 是否替换匹配到的全部字符。
 * @param {String} [config.resultKey='_resultHtml'] - 存储高亮结果的键名。
 */
export const hightLightKeyword = (list, keyword, config = {}) => {
  // 默认配置对象
  const CONFIG = {
    key: 'name',
    className: 'hight-light',
    style: '',
    isReplaceAll: true,
    resultKey: '_resultHtml',
    ...config
  };

  // 遍历列表，对每项进行关键字高亮处理
  list.forEach(item => {
    // 根据是否全替换配置来构造正则表达式
    let regx = new RegExp(keyword, CONFIG.isReplaceAll ? 'g' : '');
    // 使用正则表达式替换关键字，并将结果存储在指定的键名下
    item[CONFIG.resultKey] = item[CONFIG.key].replace(
      regx,
      `<span class="${CONFIG.className}" style="${CONFIG.style}">${keyword}</span>`
    );
  });
};