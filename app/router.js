'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 初始默认配置（账户、分类）
  router.get('/init', controller.tools.init);
  router.resources('records', '/api/records', controller.records);
};
