/*
 * @Author: pcq 1152684231@qq.com
 * @Date: 2023-11-13 18:55:00
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-03 13:06:52
 * @FilePath: /pcq-js-utils/src/tree/tree-handle.js
 * @Description: 选择树节点的一些操作
 */

import CircularJSON from "circular-json";
import { recursionArray } from '../recursion-array/recursion-array';

// 配置对象，用于指定树结构中节点键名和子节点键名
const config = {
    nodeKey: 'id', // 节点唯一标识的键名
    children: 'children' // 存储子节点的键名
}

/**
 * 为节点的子节点设置检查状态
 * @param {Object} node 当前操作的节点对象
 */
export const checkedChildren = (node) => {
    // 获取子节点数组，如果不存在则默认为空数组
    let arr = node[config.children] ? node[config.children] : [];

    // 初始化节点的half属性为false
    node.half = false;
    // 遍历子节点数组，设置子节点的检查状态
    recursionArray(arr, (e) => {
        // 如果节点被禁用，则跳过状态设置
        if (e.disabled) {
            return;
        }
        // 设置子节点的half和checked属性
        e.half = false;
        e.checked = node.checked;
    });
}

/**
 * 处理节点的祖先节点的检查状态
 * @param {Object} node 当前操作的节点对象
 */
export const handleAncestor = (node) => {
    // 将节点路径转换为字符串，便于处理
    let menuNode = CircularJSON.stringify(node.nodePath);

    // 将字符串转换为数组，并反转顺序，以便从父节点到根节点遍历
    let nodeData = CircularJSON.parse(menuNode).reverse();

    // 遍历节点路径数组，更新每个祖先节点的检查状态
    for (let i = 0; i < nodeData.length; i++) {
        if (i != 0) {
            const element = nodeData[i];
            // 在当前节点的节点路径中找到对应的实际节点
            let nodeEl = node.nodePath.find((n) => n[config.nodeKey] == element[config.nodeKey]);

            // 根据子节点的检查状态，更新父节点的检查状态
            if (
                element[config.children].filter((e) => e.checked).length ==
                element[config.children].length
            ) {
                element.checked = true;
                nodeEl.checked = true;

                element.half = false;
                nodeEl.half = false;
            } else if (
                element[config.children].filter((e) => e.checked).length == 0
                && element[config.children].filter((e) => e.half).length == 0
            ) {
                element.checked = false;
                nodeEl.checked = false;

                element.half = false;
                nodeEl.half = false;
            } else if (
                element[config.children].filter((e) => e.half).length > 0
            ) {
                element.checked = false;
                nodeEl.checked = false;

                element.half = true;
                nodeEl.half = true;
            }
            // 此处的else块似乎是多余的，因为上面的条件已经覆盖了所有可能，可以考虑移除
        }
    }
}

/**
 * 点击节点时，更新节点及其祖先节点的检查状态
 * @param {*} node 当前点击的节点对象
 */
export const updateNodeChecked = (node) => {
    // 先更新子节点的检查状态，再更新祖先节点的检查状态
    checkedChildren(node);
    handleAncestor(node);
}