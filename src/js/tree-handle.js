/*
 * @Author: pcq 1152684231@qq.com
 * @Date: 2023-11-13 18:55:00
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-11-13 19:14:06
 * @FilePath: /pcq-js-utils/src/js/tree-handle.js
 * @Description: 选择树节点的一些操作
 */

import CircularJSON from "circular-json";
import { recursionArray } from './recursion-array';

const config = {
    nodeKey: 'id',
    children: 'children'
}

/**
* 选中所有的后代节点
* @param {*} node 
*/
export const checkedChildren = (node) => {
    let arr = node[config.children] ? node[config.children] : [];

    node.half = false;
    recursionArray(arr, (e) => {
        // 禁用的不做控制
        if (e.disabled) {
            return;
        }
        e.half = false;
        e.checked = node.checked;
    });
}

/**
 * 控制祖先元素的状态
 * @param {*} node 
 */
export const handleAncestor = (node) => {
    let menuNode = CircularJSON.stringify(node.nodePath);

    let nodeData = CircularJSON.parse(menuNode).reverse();

    for (let i = 0; i < nodeData.length; i++) {
        if (i != 0) {
            const element = nodeData[i];
            // 实际节点的数据
            let nodeEl = node.nodePath.find((n) => n[config.nodeKey] == element[config.nodeKey]);

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
            else {
                element.checked = false;
                nodeEl.checked = false;

                element.half = true;
                nodeEl.half = true;
            }
        }
    }
}

/**
 * 点击节点，级联选择，强关联
 * @param {*} node 
 */
export const updateNodeChecked = (node) => {
    checkedChildren(node);
    handleAncestor(node);
}