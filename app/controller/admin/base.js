'use strict';

const Controller = require('egg').Controller;


class BaseController extends Controller {
    async success(redirectUrl, text) {

        // this.ctx.body='成功';
        let url = redirectUrl ? redirectUrl : this.ctx.request.headers['referer']

        await this.ctx.render('admin/public/success', {

            redirectUrl: url,
            text
        });


    }

    async error(redirectUrl, text) {

        let url = redirectUrl ? redirectUrl : this.ctx.request.headers['referer']

        await this.ctx.render('admin/public/error', {
            redirectUrl: redirectUrl,
            text
        });

    }
    async verify() {

        // this.ctx.body='成功';
        const captcha = await this.service.tools.captcha();
        this.ctx.response.type = 'image/svg+xml';
        console.log('====================================');
        console.log(this.ctx.session);
        console.log('====================================');
        this.ctx.body = captcha.data;

    }
    async delete() {

        let model = this.ctx.request.query.model;
        let id = this.ctx.request.query.id;
        await this.ctx.model[model].deleteOne({
            '_id': id
        });
        this.ctx.redirect(this.ctx.state.prevPage)

    }
    async changeStatus() {
        let modelName = this.ctx.request.query.model;
        let attr = this.ctx.request.query.attr;
        let id = this.ctx.request.id;
        if (!modelName && !attr && !id) {
            this.ctx.body = {
                "message": '参数有误',
                'success': false,

            }
            return
        }
        let result = await this.ctx.model[modelName].find({
            id: id
        });

        if (!result.length) {
            this.ctx.body = {
                "message": '未查询到相关数据',
                'success': false,

            }
            return
        }
        let json = {}
        if (result[0][attr] == 1) {
            json = {
                [attr]: 0
            }
        } else {
            json = {
                [attr]: 1
            }
        }
        var updateResult = await this.ctx.model[modelName].updateOne({
            id
        }, json);
        if (updateResult) {
            this.ctx.body = {
                "message": '跟新成功',
                'success': true,

            }
        } else {
            this.ctx.body = {
                "message": '跟新失败',
                'success': false,

            }
        }
    }
    async editNum() {
        let modelName = this.ctx.request.query.model;
        let attr = this.ctx.request.query.attr;
        let num = this.ctx.request.query.num;
        let id = this.ctx.request.query.id;
        console.log(`全局修改num;modelName${modelName}->attr${attr}->num${num}->id${id}`)
        if (!modelName && !attr && !id) {
            this.ctx.body = {
                "message": '参数有误',
                'success': false,

            }
            return
        }
        let result = await this.ctx.model[modelName].find({
            id: id
        });

        if (!result.length) {
            this.ctx.body = {
                "message": '未查询到相关数据',
                'success': false,

            }
            return
        }
        let json = {}
        // if (result[0][attr] == 1) {
        //     json = {
        //         [attr]: 0
        //     }
        // } else {
        //     json = {
        //         [attr]: 1
        //     }
        // }
        json[attr] = num;
        var updateResult = await this.ctx.model[modelName].updateOne({
            id
        }, json);
        if (updateResult) {
            this.ctx.body = {
                "message": '跟新成功',
                'success': true,

            }
        } else {
            this.ctx.body = {
                "message": '跟新失败',
                'success': false,

            }
        }
    }
}

module.exports = BaseController;