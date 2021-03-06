'use strict';

const Controller = require('egg').Controller;

const createRule = {
  price: 'number',
  date: 'dateTime',
};

class RecordsController extends Controller {
  async index() {
    const { ctx } = this;
    const { Record } = ctx.model;
    const pageSize = Number(ctx.query.pageSize) || 20;
    const page = Number(ctx.query.page) || 1;
    const recordList = await Record.find({})
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
    const { Record } = ctx.model;
    ctx.validate(createRule);
    let record = ctx.request.body;
    record = new Record(record);
    await record.save();
    ctx.body = record;
  }
  async destroy() {
    const { ctx } = this;
    const { Record } = ctx.model;
    const { id } = ctx.params;
    ctx.body = await Record.deleteOne({ _id: id });
  }
}

module.exports = RecordsController;
