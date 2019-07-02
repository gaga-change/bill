'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const accountList = ctx.service.account.findAll();
    const accountList = await ctx.model.Account.find({});
    await ctx.render('index.tpl', { accountList });
  }
}

module.exports = HomeController;
