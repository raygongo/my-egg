'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  router.get('/admin/login', controller.admin.login.index)
  router.get('/admin/delete', controller.admin.base.delete)
  router.post('/admin/doLogin', controller.admin.login.doLogin)
  router.get('/admin/logout', controller.admin.login.logout)
  router.get('/admin/verify', controller.admin.base.verify)
  router.get('/admin/changeStatus', controller.admin.base.changeStatus)
  router.get('/admin/editNum', controller.admin.base.editNum)

  router.get('/admin/manager', controller.admin.manager.index)
  router.get('/admin/manager/add', controller.admin.manager.add)
  router.get('/admin/manager/edit', controller.admin.manager.edit)
  router.post('/admin/manager/do_add', controller.admin.manager.doAdd)
  router.post('/admin/manager/do_edit', controller.admin.manager.doEdit)

  router.get('/admin/role', controller.admin.role.index)
  router.get('/admin/role/add', controller.admin.role.add)
  router.post('/admin/role/do_add', controller.admin.role.doAdd)
  router.post('/admin/role/do_edit', controller.admin.role.doEdit)
  router.post('/admin/role/do_auth', controller.admin.role.doAuth)
  router.get('/admin/role/edit', controller.admin.role.edit)
  router.get('/admin/role/auth', controller.admin.role.auth)

  router.get('/admin/access', controller.admin.access.index)
  router.get('/admin/access/add', controller.admin.access.add)
  router.get('/admin/access/edit', controller.admin.access.edit)
  router.post('/admin/access/do_add', controller.admin.access.doAdd)
  router.post('/admin/access/do_edit', controller.admin.access.doEdit)

  router.get('/admin/focus', controller.admin.focus.index)
  router.get('/admin/focus/upload', controller.admin.focus.upload)
  router.get('/admin/focus/edit', controller.admin.focus.edit)
  router.post(
    '/admin/focus/do_upload',
    controller.admin.focus.doUpload
  )
  router.post(
    '/admin/focus/do_edit',
    controller.admin.focus.doEdit
  )
  router.post(
    '/admin/focus/do_multi_upload',
    controller.admin.focus.doMultiUpload
  )
}
