'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545011164488_5679';

  // add your config here
  config.middleware = ['adminAuth'];

  config.adminAuth = {
    match: '/admin'
  }
  config.session = {
    key: 'SESSION_ID',
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true //延长会话有效期
  }

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
    defaultViewEngine: 'ejs',
    mapping: {
      '.html': 'ejs',
      '.nj': 'nunjucks',
    },
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/egg_admin',
    options: {},
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456789',
      // 数据库名
      database: 'egg',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  return config;
};