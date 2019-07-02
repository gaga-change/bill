'use strict';

const Controller = require('egg').Controller;

const initConfig = require('../../config/init');

class ToolsController extends Controller {
  /** 根据配置文件初始化 账号、分类 */
  async init() {
    const { ctx } = this;
    const { Account, Genera, Classify } = ctx.model;
    const { classifyInit, accountInit } = initConfig;
    let saveAccountNum = 0;
    let saveGeneraNum = 0;
    let saveClassifyNum = 0;

    for (let i = 0; i < accountInit.length; i++) {
      const accountName = accountInit[i];
      const findAccount = await Account.updateOne({ name: accountName }, {}, { upsert: true });
      if (findAccount.upserted) {
        saveAccountNum++;
      }
    }

    for (let i = 0; i < classifyInit.length; i++) {
      const { name, children } = classifyInit[i];
      const { lastErrorObject, value } = await Genera.findOneAndUpdate({ name }, {}, { upsert: true, rawResult: true });
      if (!value) {
        saveGeneraNum++;
      }
      const generaId = lastErrorObject.upserted || value._id;
      for (let j = 0; j < children.length; j++) {
        const classifyName = children[j];
        const findClassify = await Classify.findOneAndUpdate({ name: classifyName, genera: generaId }, {}, { upsert: true });
        if (!findClassify) saveClassifyNum++;
      }
    }
    ctx.body = `初始化成功！添加账户${saveAccountNum},添加归属${saveGeneraNum},添加分类${saveClassifyNum}`;
  }
}

module.exports = ToolsController;
