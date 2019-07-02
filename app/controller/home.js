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
    const generaList = await ctx.model.Genera.find({});
    const generaMap = {};
    generaList.forEach(({ id, name }) => {
      generaMap[id] = name;
    });
    await ctx.render('index.tpl', { accountList, classifyList, generaMap });
  }
}

module.exports = HomeController;
