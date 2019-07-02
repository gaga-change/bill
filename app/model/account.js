'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AccountSchema = new Schema({
    name: { type: String, default: '', trim: true }, // 名称
    price: { type: Number, default: 0 }, // 金额
    remark: { type: String, default: '', trim: true }, // 备注
  }, {
    timestamps: true,
  });

  return mongoose.model('Account', AccountSchema, 'bill_account');
};
