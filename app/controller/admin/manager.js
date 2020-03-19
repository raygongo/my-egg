'use strict';

const Controller = require('./base.js');

class ManagerController extends Controller {
  async index() {

    // 获取所有 管理员 数据
    let adminResult = await this.ctx.model.Admin.aggregate([{
      $lookup: {
        from: 'role', //关联表
        localField: 'role_id',
        foreignField: '_id',
        as: 'role'
      }
    }])
    console.log(JSON.stringify(adminResult));
    // await this.success();
    await this.ctx.render('admin/manager/index', {
      adminResult 
    });

  }


  async add() {
    let roleList = await this.ctx.model.Role.find();
    console.log(roleList);
    await this.ctx.render('admin/manager/add', {
      roleList
    });

  }

  async edit() {
    let id = this.ctx.request.query;
    if (!id) {
      await this.error('参数错误');
    }
    let admin = await this.ctx.model.Admin.findById(id);
    let roleList = await this.ctx.model.Role.find();
    await this.ctx.render('admin/manager/edit', {
      admin,
      roleList
    });
  }

  async doEdit() {
    let body = this.ctx.request.body;
    if (!body.username) {

    }
    let result = await this.ctx.model.Admin.updateOne(body)
    if (result) {
      await this.success('/admin/manager', '修改成功')
    }

  }

  async doAdd() {
    let result = this.ctx.request.body;
    // 验证 数据不能为空
    if (!result.username || !result.password || !result.role_id) {
      return await this.error('/admin/manager/add', '缺少参数')
    }
    // 判断 管理员是否存在
    let adminResult = await this.ctx.model.Admin.find({
      username: result.username
    });
    if (adminResult.length) {
      await this.error('/admin/manager/add', '管理员已存在')
    } else {

      result.password = await this.ctx.service.tools.md5(result.password);
      console.log(result);
      let admin = new this.ctx.model.Admin(result);
      admin.save()
      await this.success('/admin/manager', '增加用户成功');
    }


  }
}

module.exports = ManagerController;