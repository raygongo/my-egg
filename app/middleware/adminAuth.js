const url = require('url');

module.exports = (options) => {
    return async function adminAuth(ctx, next) {
        ctx.state.prevPage = ctx.request.headers['referer'];
        // 全局变量 csrf 用于验证 post请求 
        ctx.state.csrf = ctx.csrf;
        const pathName = url.parse(ctx.request.url).pathname;

        if (ctx.session.userinfo || pathName === '/admin/login' || pathName === '/admin/doLogin' || pathName === '/admin/verify') {
            ctx.state.userinfo = ctx.session.userinfo;
            var hasAuth = await ctx.service.admin.auth();
            if (hasAuth) {
                await next();
            } else {
                ctx.body = '对不起, 您没有权限访问当前页面!';
            }


        } else {

            ctx.redirect('/admin/login');
        }


    }
}