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
}

module.exports = BaseController;