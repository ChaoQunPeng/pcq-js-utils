/*
 * @Date: 2023-10-26 11:52:02
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-10-26 14:43:03
 * @FilePath: /qf-tools/js/utils/array-is-same.js
 * @Description: 判断两个数组是否完全一致。包括key名和value
 */

/**
 * @description: 判断两个数组是否相同
 * @param {*} newArr 新数组
 * @param {*} oldArr 旧数组
 * @return {*}
 */
export const arrayIsSame = (newArr, oldArr) => {
    if (Array.isArray(newArr) && Array.isArray(oldArr)) {
        if (newArr.length !== oldArr.length) {
            return true;
        }
        for (let i = 0; i < newArr.length; i++) {
            if (typeof newArr[i] === 'object' && typeof oldArr[i] === 'object' && newArr[i] !== null && oldArr[i] !== null) {
                if (arrayIsSame(newArr[i], oldArr[i])) {
                    return true;
                }
            } else {
                if (newArr[i] !== oldArr[i]) {
                    return true;
                }
            }
        }
    } else if (typeof newArr === 'object' && typeof oldArr === 'object' && newArr !== null && oldArr !== null) {
        for (const key in newArr) {
            if (newArr.hasOwnProperty(key)) {
                if (typeof newArr[key] === 'object' && typeof oldArr[key] === 'object' && newArr[key] !== null && oldArr[key] !== null) {
                    if (arrayIsSame(newArr[key], oldArr[key])) {
                        return true;
                    }
                } else {
                    if (newArr[key] !== oldArr[key]) {
                        return true;
                    }
                }
            }
        }
    } else {
        if (newArr !== oldArr) {
            return true;
        }
    }
    return false;
}