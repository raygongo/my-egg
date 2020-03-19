"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/login', controller.api.user.login)
  router.get('/api/current_user', controller.api.user.currentUser)
};
