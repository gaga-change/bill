'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RecordSchema = new Schema({
    classify: { ref: 'Classify', type: Schema.Types.ObjectId }, // 分类
    account: { ref: 'Account', type: Schema.Types.ObjectId }, // 账户
    price: { type: Number, default: 0 }, // 金额
    date: { type: Date, default: Date.now }, // 名称
    type: { type: Number, default: 1 }, // 类型。 0：逻辑删除 1：正常流水内容 2：隐藏内容（不可见）
    remark: { type: String, default: '', trim: true }, // 备注
  }, {
    timestamps: true,
  });

  return mongoose.model('Record', RecordSchema, 'bill_record');
};
