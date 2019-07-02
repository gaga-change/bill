'use strict';
const Service = require('egg').Service;

/**
 * 归属，大类
 */
class GeneraService extends Service {
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

module.exports = GeneraService;
