'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let user = await this.service.user.getUser();
    await this.ctx.render('index',{user});
  }
}

module.exports = HomeController;
