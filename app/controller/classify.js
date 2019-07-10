'use strict';

const Controller = require('egg').Controller;

class ClassifyController extends Controller {
  async index() {
    const { ctx } = this;
    const { Classify } = ctx.model;
    ctx.body = await Classify.find({});
  }

  async create() {
    const { ctx } = this;
    const { Classify } = ctx.model;
    let item = ctx.request.body;

    item = new Classify(item);
    ctx.body = await item.save();
  }

  async destroy() {
    const { ctx } = this;
    const { Classify } = ctx.model;
    const { id } = ctx.params;

    ctx.body = await Classify.deleteOne({ _id: id });
  }

  async update() {
    const { ctx } = this;
    const { Classify } = ctx.model;
    const { id } = ctx.params;
    const item = ctx.request.body;

    ctx.body = await Classify.update({ _id: id }, item);
  }
}

module.exports = ClassifyController;
