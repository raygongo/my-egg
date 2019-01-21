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
    /**
     * 获取当前用户角色下 的权限列表
     * @param 角色id
     * @returns []
     */
    async accessList(roleId) {
        // 获取所有 权限
        let accessResult = await this.ctx.model.Access.aggregate([{
                $match: {
                    'module_id': '0'
                }
            },
            {
                $lookup: {
                    from: 'access',
                    localField: '_id',
                    foreignField: 'module_id',
                    as: 'items'
                }
            }
        ]);
        // 获取当前角色下拥有的权限 
        let roleAccess = await this.ctx.model.RoleAccess.find({
            role_id: roleId
        });
        let accessList = [];
        if (roleAccess.length) {
            accessList = roleAccess.map(item => item.access_id.toString());
        }
        // 遍历模块权限数据 是否被选中
        accessResult.forEach((accessModule, index) => {
            // 1.判断 模块id 是否被选中
            if (accessList.includes(accessModule._id.toString())) {
                accessResult[index].checked = true;
            }
            // 2.判断 子模块列表内 是否被选中
            if (accessModule.items) {
                accessModule.items.forEach((item, index) => {
                    if (accessList.includes(item._id.toString())) {
                        accessModule.items[index].checked = true;
                    }
                })
            }
        })

        return accessResult;
    }
}

module.exports = AdminService;