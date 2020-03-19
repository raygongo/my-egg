'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./routes/admin')(app);
  require('./routes/api')(app);
}
