/*
 * @Date: 2023-07-20 21:29:13
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-07-21 09:05:15
 * @FilePath: /qf-tools/js/utils/highlight-keyword.js
 * @Description: 高亮关键字
 */

/**
 * 例子：
    resolveShortcutList() {
      const hightLightKeyword = (list, keyword) => {
        list.forEach(item => {
          item._keywordHtml = item.name.replace(new RegExp(keyword, 'g'), `<span style="color:var(--blue);">${keyword}</span>`);
        });
      };

      hightLightKeyword(list, this.shortcutSearch);

      return list.filter(e => e.name.indexOf(this.shortcutSearch) > -1);
    }
 */

/**
 * @description: 高亮列表中的关键字
 * @param {*} list 列表
 * @param {*} keyword 关键字
 * @param {*} config
 * @return {*}
 */
export const hightLightKeyword = (list, keyword, config = {}) => {
    const CONFIG = {
        /**
         * 需要替换关键字的Key
         */
        key: 'name',
        /**
         * 高亮字class名
         */
        className: '',
        /**
         * 高亮字style
         */
        style: '',
        /**
         * 是否替换匹配到的全部字符
         */
        isReplaceAll: true,
        ...config
    }

    list.forEach(item => {
        let regx = new RegExp(keyword, CONFIG.isReplaceAll ? 'g' : '');
        item.$keywordHtml = item[CONFIG.key].replace(regx, `<span class="${CONFIG.className}" style="${CONFIG.style}">${keyword}</span>`);
    });
};