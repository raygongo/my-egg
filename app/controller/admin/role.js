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
    let accessResult = await this.ctx.model.Access.aggregate([{
        $match: {
          'module_id': '0'
        }
      },
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      }
    ])
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
    let role_id = this.ctx.request.query.role_id
    // if (result) {
    //   await this.success('/admin/role', '编辑角色成功');
    // }
    body.access_node.forEach((item) => {
      let roleAccessData = new this.ctx.model.RoleAccess({
        role_id: role_id,
        access_id: item
      })
      roleAccessData.save()
    })

    console.log(body);

  }


  async delete() {


    this.ctx.body = '角色删除'

  }
}

module.exports = RoleController;