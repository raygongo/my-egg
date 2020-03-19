'use strict'
const path = require('path')
module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545011164488_5679'

  config.uploadDir = 'app/public/admin/upload/'
  // add your config here
  config.middleware = ['adminAuth', 'authToken']

  config.adminAuth = {
    match: '/admin'
  }
  config.authToken = {
    match: '/api'
  }
  config.session = {
    key: 'SESSION_ID',
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true //延长会话有效期
  }
  config.security = {
    csrf: false
    // {
    //   type: 'ctoken',             // can be ctoken or referer or all, default to ctoken
    //   useSession: false,          // if useSession set to true, the secret will keep in session instead of cookie
    //   ignoreJSON: false,          // skip check JSON requests if ignoreJSON set to true
    //   cookieName: 'csrfToken',    // csrf token's cookie name
    //   sessionName: 'csrfToken',   // csrf token's session name
    //   headerName: 'x-csrf-token', // request csrf token's name in header
    //   bodyName: '_csrf',          // request csrf token's name in body
    //   queryName: '_csrf',         // request csrf token's name in query
    //   refererWhiteList: [],       // referer white list
    // },
  }
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another')
    ].join(','),
    defaultViewEngine: 'ejs',
    mapping: {
      '.html': 'ejs',
      '.nj': 'nunjucks'
    }
  }
  config.mongoose = {
    url: 'mongodb://127.0.0.1/egg_admin',
    options: {}
  }
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456789',
      // 数据库名
      database: 'egg'
    },
    // 是否加载到 app 上，默认开启
    app: false,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }
  return config
}
