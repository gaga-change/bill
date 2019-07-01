'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const accountList = ctx.service.account.findAll();
    await ctx.render('index.tpl', { accountList });
  }
}

module.exports = HomeController;
