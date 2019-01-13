'use strict';

const Service = require('egg').Service;
const url = require('url');
class AdminService extends Service {
    async auth() {
        // 验证当前用户角色权限 的url 和当前url是否匹配
        // 1.获取当前页面url
        let pathName = url.parse(this.ctx.request.url).pathname;
        // 1.1 过滤不需要进行权限验证的 页面
        let ignoreUrl = ['/admin/login', '/admin/doLogin', '/admin/verify', '/admin/logout'];
        if (ignoreUrl.includes(pathName)) {
            return true;
        }
        // 2.获取用户对应 的 角色权限 列表
        let userinfo = this.ctx.session.userinfo;
        let role_id = userinfo.role_id;
        let accessList = await this.ctx.model.RoleAccess.find({
            role_id: role_id
        });
        accessList = accessList.map(item => item.access_id.toString());
        // 2.2 判断是否当前用户角色是否为 超级管理员 is_super
        if (userinfo.is_super) {
            return true;
        }
        // 3. 获取当前页面url 对应的 权限列表
        let urlAccessList = await this.ctx.model.Access.find({
            url: pathName
        });
        // 4. 判断当前管理员 所拥有的权限 是否包含 当前页面 所属的权限
        if (urlAccessList.length > 0 && accessList.length > 0) {
            return accessList.includes(urlAccessList[0]._id.toString())
        }
        return false



    }
}

module.exports = AdminService;