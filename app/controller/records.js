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
    switch (classify.type) {
      case 1:
        record.price = -Math.abs(record.price);
        break;
      case 2:
        record.price = Math.abs(record.price);
        break;
      case 3:
      case 4:
      default:
        break;
    }
    record = new Record(record);
    await record.save();
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
