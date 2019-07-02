/* eslint valid-jsdoc: "off" */

'use strict';

const { mongodbConnectLink } = require('./mongo');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1561947651284_2340';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.tpl': 'nunjucks',
      },
    },
    mongoose: {
      url: mongodbConnectLink,
      options: {},
      plugins: [],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
