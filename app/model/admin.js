module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    let d = new Date();
    const AdminSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        mobile: {
            type: String
        },
        email: {
            type: String
        },
        status: {
            type: Number,
            default: 1
        },
        role_id: {
            type: Schema.Types.ObjectId,
        },
        add_time: {
            type: Number,
            default: d.getTime()
        },
        is_super: {
            type: Number,
            default: 0 // 超级管理员
        }
    });

    return mongoose.model('Admin', AdminSchema, 'admin');
}