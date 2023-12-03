/*
 * @Author: pcq 1152684231@qq.com
 * @Date: 2023-11-13 18:34:17
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-11-13 19:12:46
 * @FilePath: /pcq-js-utils/src/js/tree-resolve.js
 * @Description: 处理树结构类型，增加树结构的一些字段类型。
 */


/**
 * 处理树结构类型，增加树结构的一些字段类型。
 * @params dataList 数组
 * @params config 配置 nodeKey默认id，唯一标识
 */
export const resolveTree = (dataList, config) => {
    let tree = JSON.parse(JSON.stringify(dataList));
    const nodeMap = {};
    const nodeArray = [];

    const cfg = {
        /**
         * 唯一标识
         */
        nodeKey: "id",
        /**
         * 文本
         */
        labelKey: 'name',
        /**
         * 子节点字段名
         */
        childrenKey: 'children',
        ...config
    };

    const recursion = (array, parent) => {
        for (let i = 0; i < array.length; i++) {
            let originElement = {};
            let element = {};

            originElement = array[i];
            element['value'] = originElement[cfg.nodeKey];
            element['label'] = originElement[cfg.labelKey];

            // 增加原始数据字段
            element['originData'] = JSON.parse(JSON.stringify(originElement));

            // 增加node path字段
            element['nodePath'] = [];
            element.nodePath.push(element);

            element.nodePath = [...element.nodePath];

            if (parent && parent.nodePath) {
                element.nodePath = [...element.nodePath, ...parent.nodePath];
            }


            // 保存层级
            if (parent) {
                element['level'] = parent.level + 1;
            } else {
                element['level'] = 1;
            }

            // 保存父节点
            element['parent'] = parent;
            // 是否选中的key
            element['checked'] = false;
            // 是否禁用的key
            element['disabled'] = false;
            // 是否半选
            element['half'] = false;
            // 是否展开
            element['expand'] = false;

            // 是否叶子节点，这个Key都不存在
            if (!element[cfg.childrenKey]) {
                element['leaf'] = true;
            } else {
                element['leaf'] = false;
            }

            // 存入map中
            // 可能就没有唯一的一个key，nodeMap就没用了
            if (originElement[cfg.nodeKey]) {
                nodeMap[originElement[cfg.nodeKey]] = element;
            }


            // 存入数组中
            nodeArray.push(element);

            if (originElement[cfg.childrenKey] != undefined && originElement[cfg.childrenKey].length > 0) {
                recursion(originElement[cfg.childrenKey], element);
            }
        }
    };

    recursion(tree);

    nodeArray.forEach(e => {
        e.nodePath = e.nodePath.reverse();
    });

    return {
        // 处理过的树结构
        tree,
        // node的映射集合
        nodeMap,
        // node的数组
        nodeArray
    };
}


