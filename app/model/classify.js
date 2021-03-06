'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ClassifySchema = new Schema({
    name: { type: String, default: '', trim: true }, // 名称
    genera: { ref: 'Genera', type: Schema.Types.ObjectId }, // 归属
    remark: { type: String, default: '', trim: true }, // 备注
    type: { type: Number, default: 1 }, // 类型
  }, {
    timestamps: true,
  });

  return mongoose.model('Classify', ClassifySchema, 'bill_classify');
};
