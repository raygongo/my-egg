'use strict';
const Controller = require('./base.js');

class RoleController extends Controller {
  async index() {

    let list = await this.ctx.model.Role.find({});

    await this.ctx.render('admin/role/index', {
      list
    });


  }


  async add() {


    await this.ctx.render('admin/role/add');

  }
  async doAdd() {

    let body = this.ctx.request.body
    // await this.ctx.render('admin/role/do_add');

    let role = new this.ctx.model.Role({
      title: body.title,
      description: body.description
    });
    let result = await role.save();
    if (result) {
      await this.success('/admin/role', '增加角色成功');
    }

  }

  async edit() {

    let id = this.ctx.query._id;
    if (!id) {
      await this.error('/admin/role', '参数错误');
    }
    let data = await this.ctx.model.Role.find({
      _id: id
    });
    await this.ctx.render('admin/role/edit', {
      data: data[0]
    });

  }

  async auth() {
    // 获取id 查询对应数据
    let id = this.ctx.request.query._id;
    // 获取所有 权限
    let accessResult = await this.ctx.service.admin.accessList(id);
    await this.ctx.render('admin/role/auth', {
      list: accessResult,
      role_id: id
    });

  }


  async doEdit() {

    let body = this.ctx.request.body

    let result = await this.ctx.model.Role.findByIdAndUpdate(body._id, {
      title: body.title,
      description: body.description
    });
    if (result) {
      await this.success('/admin/role', '编辑角色成功');
    }

  }

  async doAuth() {

    let body = this.ctx.request.body
    let role_id = body.role_id
    // if (result) {
    //   await this.success('/admin/role', '编辑角色成功');
    // }
    console.log(body);
    // 先删除当前角色已经选中的权限
    let oldAccess = await this.ctx.model.RoleAccess.deleteMany({
      'role_id': role_id
    })
    if (!oldAccess) {
      await this.error('', '服务器错误');
    } else {
      body.access_node.forEach((item) => {
        let roleAccessData = new this.ctx.model.RoleAccess({
          role_id: role_id,
          access_id: item
        })
        roleAccessData.save()
      })
      await this.success('', '授权成功');
    }


  }


  async delete() {


    this.ctx.body = '角色删除'

  }
}

module.exports = RoleController;