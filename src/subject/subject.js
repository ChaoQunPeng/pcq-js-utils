/*
 * @Date: 2023-08-27 23:32:56
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-06-03 09:25:56
 * @FilePath: /pcq-js-utils/src/subject/subject.js
 * @Description: 通用的发布订阅
 */

class Subject {
  /**
   * 构造函数初始化一个空的对象来存储事件名称与观察者函数的映射。
   */
  constructor() {
    this.subjectMaps = {};
  }

  /**
   * 订阅指定事件。
   * @param {string} eventName - 事件名称。
   * @param {Function} fn - 观察者函数，事件被触发时会调用此函数。
   */
  subscribe(eventName, fn, options = { onlyOne: false }) {
    // 如果没有订阅过此事件，则初始化一个空数组
    if (!this.subjectMaps[eventName]) {
      this.subjectMaps[eventName] = [];
    }

    // 至少要注册一个事件
    if (this.subjectMaps[eventName].length == 0) {
      this.subjectMaps[eventName].push(fn);
    }
    // 如果已经存在，并且options.onlyOne为false，则允许继续注册，即允许注册多个相同名称的事件。
    else if (this.subjectMaps[eventName].length > 0 && !options.onlyOne) {
      this.subjectMaps[eventName].push(fn);
    }
  }

  /**
   * 取消订阅指定事件或取消指定观察者对所有事件的订阅。
   * @param {string} [eventName] - 可选的事件名称。如果提供，仅取消此事件的订阅；否则，取消此观察者对所有事件的订阅。
   * @param {Function} [observer] - 可选的观察者函数。如果提供，仅取消此函数的订阅；否则，取消所有订阅。
   */
  unsubscribe(eventName, observer) {
    if (observer) {
      let idx = this.subjectMaps[eventName].findIndex(item => item === observer); // 查找指定观察者函数在事件观察者数组中的索引
      idx > -1 && this.subjectMaps[eventName].splice(idx, 1); // 如果找到，从数组中移除
    } else {
      this.subjectMaps[eventName] = []; // 如果没有指定观察者函数，清空事件的观察者数组
    }
  }

  /**
   * 触发指定事件，调用所有订阅了该事件的观察者函数。
   * @param {string} eventName - 事件名称。
   * @param {*} data - 传递给观察者函数的数据。
   */
  publish(eventName, data) {
    if (!this.subjectMaps[eventName]) {
      return; // 如果没有订阅此事件，则直接返回
    }

    this.subjectMaps[eventName].forEach(fn => {
      fn(data); // 调用所有订阅了此事件的观察者函数，传入数据
    });
  }
}