'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const svgCaptcha = require('svg-captcha');

class ToolsService extends Service {
    async captcha() {
        const captcha = svgCaptcha.create({
            size: 6,
            fontSize: 50,
            width: 100,
            height: 40,
            background: "#cc9966"
        });
        this.ctx.session.code = captcha.text;
        return captcha;
    }
    async md5(value) {
        return md5(value);
    }
}

module.exports = ToolsService;