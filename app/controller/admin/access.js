'use strict';

const Controller = require('./base.js');

class AccessController extends Controller {
  async index() {

    // 1. 获取顶级模块 module_id == 0 的模块
    // 2. access表 关联 access module_id == _id 

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
    await this.ctx.render('admin/access/index', {
      list: accessResult
    });


  }


  async add() {
    // 获取模块列表
    var moduleResult = await this.ctx.model.Access.find({
      'module_id': '0'
    })

    await this.ctx.render('admin/access/add', {
      moduleList: moduleResult
    });

  }

  async edit() {
    // 获取id 查询对应数据
    let id = this.ctx.request.query._id;
    var moduleResult = await this.ctx.model.Access.find({
      'module_id': '0'
    })
    var accessResult = await this.ctx.model.Access.findById(id)

    await this.ctx.render('admin/access/edit', {
      moduleList: moduleResult,
      data: accessResult
    });

  }
  

  // 添加权限
  async doAdd() {


    // 未做数据校验

    let body = this.ctx.request.body;
    // 获取需要增加的所属模块id
    if (body.module_id != 0) {
      // 增加菜单 或者 操作
      body.module_id = this.app.mongoose.Types.ObjectId(body.module_id);
    }
    let access = new this.ctx.model.Access(body);
    let result = access.save();
    if (result) {
      await this.success('/admin/access', '增加权限成功');
    }
  }
  // 编辑权限
  async doEdit() {
    // 未做数据校验
    let body = this.ctx.request.body;
    let id = body._id;
    // 获取需要增加的所属模块id
    if (body.module_id != 0) {
      // 增加菜单 或者 操作
      console.log("转换module_id为ObjectId");
      body.module_id = this.app.mongoose.Types.ObjectId(body.module_id);
    }
    let result = await this.ctx.model.Access.updateOne({
      '_id': id
    }, body)
    if (result) {
      await this.success('/admin/access', '修改权限成功');
    }


  }
}

module.exports = AccessController;