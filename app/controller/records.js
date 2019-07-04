'use strict';

const Controller = require('egg').Controller;

const createRule = {
  price: 'number',
  date: 'dateTime',
  classify: 'string',
};

class RecordsController extends Controller {
  async index() {
    const { ctx } = this;
    const { Record } = ctx.model;
    const pageSize = Number(ctx.query.pageSize) || 20;
    const page = Number(ctx.query.page) || 1;
    const recordList = await Record.find({ type: 1 })
      .populate('account classify')
      .sort({ date: -1, createdAt: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    ctx.body = {
      count: await Record.count({}),
      records: recordList,
    };
  }

  async create() {
    const { ctx } = this;
    const { Record, Classify } = ctx.model;
    ctx.validate(createRule);
    let record = ctx.request.body;
    const classify = await Classify.findById(record.classify);
    const { account1, account2 } = record;
    let temp1 = { ...record, account: account1 };
    let temp2 = { ...record, account: account2 };
    switch (classify.type) {
      case 1:
        // 支出
        record.price = -Math.abs(record.price);
        record = new Record(record);
        await record.save();
        break;
      case 2:
        // 收入
        record.price = Math.abs(record.price);
        record = new Record(record);
        await record.save();
        break;
      case 3:
        // 账户互转
        temp1.price = -Math.abs(temp1.price);
        temp1 = new Record(temp1);
        await temp1.save();
        temp2.price = Math.abs(temp2.price);
        temp2 = new Record(temp2);
        await temp2.save();
        break;
      case 4:
      default:
        break;
    }

    ctx.body = record;
  }

  async destroy() {
    const { ctx } = this;
    const { Record } = ctx.model;
    const { id } = ctx.params;
    // 逻辑删除
    ctx.body = await Record.updateOne({ _id: id }, { type: 0 });
  }
}

module.exports = RecordsController;
