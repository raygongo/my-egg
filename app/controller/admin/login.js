'use strict';

const Controller = require('./base.js');

class LoginController extends Controller {
  async index() {

    await this.ctx.render('admin/login');
  }
  async doLogin() {

    /**
     * 1. 获取提交数据
     * 2. 验证码正确性 
     *  
     * 1. 表单密码 进行md5加密
     * 2. 在用户集合(表)中 查询当前用户是否存在
     * 3. 如果用户信息存在 (登陆成功) : 保存用户信息  跳转到后台
     * 4. 不存在 跳转到登陆页面 (登陆失败)
     * 
     */
    console.log(this.ctx.request.body);
    console.log(this.ctx.session);
    let body = this.ctx.request.body;
    let username = body.username;
    let password = await this.service.tools.md5(body.password);
    console.log(password);
    console.log(this.ctx.model);
    if (body.verify.toUpperCase() == this.ctx.session.code.toUpperCase()) {

      let result = await this.ctx.model.Admin.find({
        "username": username,
        "password": password
      });
      console.log(result.length);
      console.log('登陆成功');
      if (result.length > 0) {
        // 登陆成功 存储用户信息
        this.ctx.session.userinfo = result[0]
        this.ctx.redirect('/admin/manager');
      } else {
        await this.error('/admin/login', '用户名或密码错误');
      }

    } else {
      await this.error('/admin/login', '验证码错误');
    }

    // await this.success('/admin/login')
  }

  async logout(){
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;