module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var date = new Date();

    const AccessSchema = new Schema({
        module_name: { // 模块名称
            type: String
        },
        action_name: { // 操作名称
            type: String
        },
        type: { // 节点类型    1模块 2菜单 3操作
            type: Number
        },
        url: {
            type: String
        },
        module_id: { // 表示模块 && 模型的_id   ==0时 为模块
            type: Schema.Types.Mixed // 混合类型
        },
        sort: { // 
            type: Number,
            default: 100
        },
        description: { // 
            type: String
        },
        status: { // 
            type: Number,
            default: 1
        },
        add_time: { // 
            type: Number,
            default: date.getTime()
        },
    })

    return mongoose.model('Access', AccessSchema, 'access');
}