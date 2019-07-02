'use strict';

const Controller = require('egg').Controller;

const createRule = {
  price: 'int',
  date: 'dateTime',
};

class RecordsController extends Controller {
  async index() {
    const { ctx } = this;
    const { Record } = ctx.model;
    const recordList = await Record.find({}).populate('account classify');
    ctx.body = recordList;
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
}

module.exports = RecordsController;
