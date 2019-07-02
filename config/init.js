'use strict';

const classifyInit = [{
  name: '食物',
  children: [ '早餐', '午餐', '晚餐', '零食', '下午茶', '夜宵', '早午餐', '水果', '烟酒' ],
}, {
  name: '交通',
  children: [ '共享单车', '共享汽车', '打车', '停车费', '火车', '汽车' ],
}, {
  name: '消费',
  children: [ '书籍', '衣服', '鞋子', '超市' ],
}, {
  name: '娱乐',
  children: [ '电影', 'KTV', '洗浴' ],
}, {
  name: '居家',
  children: [ '房租', '电费', '电话费' ],
}, {
  name: '收入',
  children: [ '薪资', '红包', '退款' ],
}];

const accountInit = [ '支付宝', '中兴银行', '工商银行', '招商信用卡' ];

exports.classifyInit = classifyInit;
exports.accountInit = accountInit;
