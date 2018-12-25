'use strict';

const Controller = require('./base.js');

class AccessController extends Controller {
  async index() {

        
    await this.ctx.render('admin/access/index');

 
} 


async add() {


 await this.ctx.render('admin/access/add');
 
} 

async edit() {


 await this.ctx.render('admin/access/edit');
 
} 
}

module.exports = AccessController;
