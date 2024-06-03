/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-05-02 17:59:17
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-22 16:24:26
 * @FilePath: /pcq-js-utils/index.d.ts
 * @Description:
 */

declare module 'pcq-js-utils' {
  /**
   * Subject 类用于管理事件的订阅和发布。
   */
  class Subject {
    // 存储事件名到回调函数数组的映射
    private subjectMaps: { [key: string]: Function[] };

    /**
     * 订阅指定事件。
     * @param eventName 要订阅的事件名称。
     * @param fn 当事件触发时执行的回调函数。
     */
    subscribe: (eventName: string, fn: Function) => void;

    /**
     * 取消订阅指定事件的回调函数。
     * 如果不提供 eventName 和 observer，则取消所有订阅。
     * 如果只提供 eventName，则取消该事件的所有订阅。
     * 如果只提供 observer，则取消所有该观察者的订阅。
     * @param eventName 可选的事件名称。
     * @param observer 可选的回调函数。
     */
    unsubscribe: (eventName?: string, observer?: Function) => void;

    /**
     * 发布指定事件，触发所有订阅了该事件的回调函数。
     * @param eventName 要发布的事件名称。
     * @param data 与事件一起发布的数据。
     */
    publish: (eventName: string, data: any) => void;
  }

  /**
   * 模拟 sleep 函数。
   * @param times 模拟的 sleep 时间（毫秒）。
   * @returns 一个 Promise，在指定的时间后 resolve。
   */
  const fakeSleep: (times: number) => Promise<any>;

  /**
   * 定义一个接口 IRecursionArrayConfig，用于配置递归数组处理的选项。
   * 其中包括 children 属性，默认值为 'children'，以及一个索引签名，允许其他键值对。
   */
  interface IRecursionArrayConfig {
    children: string;
    [key: string]: string;
  }

  /**
   * 递归遍历数组的函数。
   * @param array 要遍历的数组。
   * @param cb 对数组中每个元素执行的回调函数。
   * @param config 配置对象，包括指定子元素的键名。
   */
  const recursionArray: (
    array: Array<any>,
    cb: (e: any) => void,
    config: IRecursionArrayConfig
  ) => void;

  /**
   * 递归追踪数组的函数，与 recursionArray 类似，先处理子元素，再处理父元素。
   * @param array 要遍历的数组。
   * @param cb 对数组中每个元素执行的回调函数。
   * @param config 配置对象，包括指定子元素的键名。
   */
  const recursionTrailArray: (
    array: Array<any>,
    cb: (e: any) => void,
    config: IRecursionArrayConfig
  ) => void;

  /**
   * 定义了一个树结构操作的接口，包含对树节点的检查、处理祖先节点以及更新节点检查状态的方法。
   */
  interface ITreeHandle {
    /**
     * 检查子节点的方法。
     * @param node 当前操作的节点。
     * 方法会根据当前节点的操作（如选中或取消选中），递归地对所有子节点进行相同的操作。
     */
    checkedChildren: (node: any) => void;

    /**
     * 处理祖先节点的方法。
     * @param node 当前操作的节点。
     * 方法会根据当前节点的状态（如选中或取消选中），递归地更新所有祖先节点的状态以反映当前节点的变化。
     */
    handleAncestor: (node: any) => void;

    /**
     * 更新节点检查状态的方法。
     * @param node 当前操作的节点。
     * 方法用于直接更新指定节点的检查状态，通常在特定逻辑下触发，如用户手动选中或取消选中节点。
     */
    updateNodeChecked: (node: any) => void;
  }

  interface IResolveTreeConfig {
    /**
     * 节点的唯一标识符。默认为 'id'
     */
    nodeKey: string;
    /**
     * 节点显示的文本。默认为 'children'
     */
    labelKey: string;
    /**
     * 存储子节点的字段名。默认为 'children'
     */
    childrenKey: string;
  }

  /**
   * 根据给定的配置信息，解析并构建树状结构。
   * @param list 一个包含需要构建树状结构数据的数组。
   * @param config 一个包含构建树状结构所需配置的对象，具体属性根据 IResolveTreeConfig 接口定义
   * 默认值是id、name、children。
   * @returns void 该函数没有返回值。
   */
  const resolveTree: (list: Array<any>, config?: IResolveTreeConfig) => void;

  /**
   * 格式化日期。
   * @param value 可以是日期字符串、数字或Date对象。
   * @param format 日期格式，默认为'YYYY-MM-DD'。可以根据需要自定义格式，例如：'YYYY年MM月DD日'。
   * @param emptyText 如果传入的value无法解析为有效日期时，将显示此参数指定的文本，默认为'-'。
   * @returns void 此函数没有返回值，它主要用于将日期格式化后输出或用于其他逻辑处理。
   */
  const dateFormat: (value: string | number | Date, format: string, emptyText: string) => void;

  /**
   * 定义一个用于高亮关键词的配置接口。
   *
   * @interface IHightLightKeywordConfig
   * @property {string} key - 要替换的key名
   * @property {string} className - 用于关键词高亮的CSS类名。
   * @property {string} style - 直接应用于关键词的内联样式。
   * @property {true} isReplaceAll - 指定是否替换所有匹配的关键词。此属性值固定为true。
   * @property {string} resultKey - 匹配成功后，结果在对象中存储的键名。
   * @property {[key: string]: any} - 允许额外的属性以任意键值对的形式存在。
   */
  interface IHightLightKeywordConfig {
    key: string;
    className: string;
    style: string;
    isReplaceAll: true;
    resultKey: string;
    [key: string]: any;
  }

  const hightLightKeyword: (
    list: Array<any>,
    keyword: string,
    config: IHightLightKeywordConfig
  ) => void;

  const isEmpty: (obj: any) => Boolean;
}