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

    console.log(this.ctx.request.body);
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
    console.log(data[0]);
    await this.ctx.render('admin/role/edit', {
      data: data[0]
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


  async delete() {


    this.ctx.body = '角色删除'

  }
}

module.exports = RoleController;