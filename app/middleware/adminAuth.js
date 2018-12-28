const url = require('url');

module.exports = (options) => {
    return async function adminAuth(ctx, next) {
        ctx.state.prevPage = ctx.request.headers['referer'];
        // 全局变量 csrf 用于验证 post请求 
        ctx.state.csrf = ctx.csrf;
        console.log('中间件')
        const pathName = url.parse(ctx.request.url).pathname;

        if (ctx.session.userinfo) {
            ctx.state.userinfo = ctx.session.userinfo; 
            await next();
        } else if (pathName === '/admin/login' || pathName === '/admin/doLogin' || pathName === '/admin/verify') {
            await next();

        } else {

            ctx.redirect('/admin/login');
        }


    }
}