/*
 * @Author: pcq 1152684231@qq.com
 * @Date: 2023-11-13 18:34:17
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-03 13:27:55
 * @FilePath: /pcq-js-utils/src/tree/tree-resolve.js
 * @Description: 处理树结构类型，增加树结构的一些字段类型。
 */

/**
 * 将给定的数据列表转换为树结构。
 * @param dataList 原始数据列表，每个元素应包含节点信息。
 * @param config 配置对象，可用于覆盖默认的节点键值。
 * @returns 返回一个对象，包含处理过的树结构、节点的映射集合和节点的数组。
 */
export const resolveTree = (dataList, config = {}) => {
  let tree = JSON.parse(JSON.stringify(dataList));
  /**
   * 创建并初始化一个用于存储节点的对象映射表和数组。
   * 这段代码不接受参数，也不直接返回值，但为后续的节点管理提供了基础结构。
   *
   * @property {Object} nodeMap - 一个空的对象，用于通过键值对存储节点信息。
   * @property {Array} nodeArray - 一个空的数组，用于存储节点信息的列表。
   */
  const nodeMap = {};
  const nodeArray = [];

  // 默认配置与传入配置的合并
  const cfg = {
    /**
     * 节点的唯一标识符
     */
    nodeKey: 'id',
    /**
     * 节点显示的文本
     */
    labelKey: 'name',
    /**
     * 存储子节点的字段名
     */
    childrenKey: 'children',
    ...config
  };

  // 递归构建树结构
  const recursion = (array, parent) => {
    for (let i = 0; i < array.length; i++) {
      let originElement = {};
      let element = {};

      originElement = array[i];
      /**
       * 基于配置的nodeKey和labelKey，从源元素提取相应的值，
       * 并将这些值赋给目标元素的value和label属性。
       */
      element['value'] = originElement[cfg.nodeKey]; // 根据配置的nodeKey，从源元素获取值并赋给目标元素的value属性
      element['label'] = originElement[cfg.labelKey]; // 根据配置的labelKey，从源元素获取标签并赋给目标元素的label属性

      // 为节点增加原始数据字段
      element['originData'] = JSON.parse(JSON.stringify(originElement));

      // 初始化节点路径
      element['nodePath'] = [];
      element.nodePath.push(element);

      // 合并父节点的路径
      if (parent && parent.nodePath) {
        element.nodePath = [...element.nodePath, ...parent.nodePath];
      }

      // 计算节点层级
      if (parent) {
        element['level'] = parent.level + 1;
      } else {
        element['level'] = 1;
      }

      // 保存父节点引用
      element['parent'] = parent;

      // 初始化选择、禁用、半选和展开状态
      element['checked'] = false;
      element['disabled'] = false;
      element['half'] = false;
      element['expand'] = false;

      // 判断节点是否为叶子节点
      if (!element[cfg.childrenKey]) {
        element['leaf'] = true;
      } else {
        element['leaf'] = false;
      }

      // 将节点加入映射和数组中
      if (originElement[cfg.nodeKey]) {
        nodeMap[originElement[cfg.nodeKey]] = element;
      }
      nodeArray.push(element);

      // 如果存在子节点，则递归处理
      if (
        originElement[cfg.childrenKey] != undefined &&
        originElement[cfg.childrenKey].length > 0
      ) {
        recursion(originElement[cfg.childrenKey], element);
      }
    }
  };

  recursion(tree);

  // 翻转节点路径，以便正确获取从根到叶的路径
  nodeArray.forEach(e => {
    e.nodePath = e.nodePath.reverse();
  });

  /**
   * 返回一个包含树结构相关信息的对象
   * @return {Object} 返回的对象包含以下属性:
   *  - tree: 表示树结构的整体
   *  - nodeMap: 一个映射表，用于快速查找树中特定节点
   *  - nodeArray: 包含树中所有节点的数组，方便进行遍历操作
   */
  return {
    tree,
    nodeMap,
    nodeArray
  };
};
