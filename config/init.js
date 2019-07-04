'use strict';

const classifyInit = [{
  name: '食物',
  type: 1,
  children: [ '早餐', '午餐', '晚餐', '零食', '饮料', '夜宵', '早午餐', '水果', '烟酒' ],
}, {
  name: '交通',
  type: 1,
  children: [ '共享单车', '共享汽车', '打车', '停车费', '火车', '汽车', '公交' ],
}, {
  name: '购物',
  type: 1,
  children: [ '书籍', '衣服', '鞋子', '超市', '其他' ],
}, {
  name: '娱乐',
  type: 1,
  children: [ '电影', 'KTV', '洗浴' ],
}, {
  name: '居家',
  type: 1,
  children: [ '房租', '电费', '电话费' ],
}, {
  name: '收入',
  type: 2,
  children: [ '薪资', '红包', '退款' ],
}, {
  name: '转账',
  type: 3,
  children: [ '账户互转', '信用卡还贷', '取钱', '存钱' ],
}, {
  name: '借贷',
  type: 4,
  children: [ '借入', '借出', '还款', '收款' ],
}];

const accountInit = [ '支付宝', '中信银行', '工商银行', '招商信用卡', 'QQ', '微信', '花呗', '京东白条', '人', '现金' ];

exports.classifyInit = classifyInit;
exports.accountInit = accountInit;
