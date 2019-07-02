'use strict';
const Service = require('egg').Service;

/**
 * 分类，小类
 */
class ClassifyService extends Service {
  findAll() {
    return [
      {
        id: 1,
        name: '支付宝',
      },
      {
        id: 2,
        name: '中信银行',
      },
    ];
  }
}

module.exports = ClassifyService;
