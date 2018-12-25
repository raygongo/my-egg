'use strict';

const Controller = require('egg').Controller;


class BaseController extends Controller {
    async success(redirectUrl, text) {

        // this.ctx.body='成功';

        await this.ctx.render('admin/public/success', {

            redirectUrl: redirectUrl
        });


    }

    async error(redirectUrl, text) {

        // this.ctx.body='成功';

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
}

module.exports = BaseController;