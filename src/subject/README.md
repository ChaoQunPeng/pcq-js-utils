<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-05-03 11:23:34
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-05-03 11:23:41
 * @FilePath: /pcq-js-utils/src/subject/README.md
 * @Description:
-->

click() {
this.$qf.Subject.publish('事件名', '额外参数，任意类型');
}

订阅
this.$qf.Subject.subscribe('事件名', this.fn1);

this.$qf.Subject.subscribe('事件名', data => {
console.log(2, data);
});

// 发布事件
click() {
this.$qf.Subject.publish('事件名', '额外参数，任意类型');
}

    // 订阅
    this.$qf.Subject.subscribe('事件名', this.fn1);

    this.$qf.Subject.subscribe('事件名', data => {
      console.log(2, data);
    });

    // 取消订阅
    this.$qf.Subject.unsubscribe('事件名')
