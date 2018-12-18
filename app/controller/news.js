'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
    async index() {
        // let content = await this.app.mongo.find('egg');
        // console.log(content);
        // 结合egg-mongo-native 实现简单的增删查改
        // 1. 增加数据
        console.log("开始插入数据");
         await this.app.mongo.insertOne('egg', {
            doc: {
                name: '蔡依林'
            }
        })

        await this.ctx.render('news', {
            content:"数据写入成功"
        });
    }
}

module.exports = NewsController;