'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const accountList = await ctx.model.Account.find({});
    const classifyList = await ctx.model.Classify.aggregate(
      [
        { $group: { _id: '$genera', children: { $push: '$$ROOT' } } },
      ]
    );
    await ctx.render('index.tpl', { accountList });
  }
}

module.exports = HomeController;
