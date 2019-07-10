'use strict';

const Controller = require('egg').Controller;

class GeneraController extends Controller {
  async index() {
    const { ctx } = this;
    const { Genera } = ctx.model;
    ctx.body = await Genera.find({});
  }

  async create() {
    const { ctx } = this;
    const { Genera } = ctx.model;
    let item = ctx.request.body;

    item = new Genera(item);
    ctx.body = await item.save();
  }

  async destroy() {
    const { ctx } = this;
    const { Genera } = ctx.model;
    const { id } = ctx.params;

    ctx.body = await Genera.deleteOne({ _id: id });
  }

  async update() {
    const { ctx } = this;
    const { Genera } = ctx.model;
    const { id } = ctx.params;
    const item = ctx.request.body;

    ctx.body = await Genera.update({ _id: id }, item);
  }
}

module.exports = GeneraController;
