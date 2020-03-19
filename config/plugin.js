'use strict'

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs'
}
exports.mongo = {
  enable: false,
  package: 'egg-mongo-native'
}
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
}
exports.mysql = {
  enable: false,
  package: 'egg-mysql'
}

// {app_root}/config/plugin.js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};