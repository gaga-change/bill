'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GeneraSchema = new Schema({
    name: { type: String, default: '', trim: true }, // 名称
    remark: { type: String, default: '', trim: true }, // 备注
  }, {
    timestamps: true,
  });

  return mongoose.model('Genera', GeneraSchema, 'bill_genera');
};
