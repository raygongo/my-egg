module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  var date = new Date()

  const FocusSchema = new Schema({
    title: {
      type: String
    },
    type: {
      // 类型名称
      type: Number
    },
    focus_img: {
      // 图片地址
      type: String
    },
    // 链接
    link: {
      type: String
    },
    sort: {
      //
      type: Number,
      default: 100
    },
    status: {
      //
      type: Number,
      default: 1
    },
    add_time: {
      //
      type: Number,
      default: date.getTime()
    }
  })

  return mongoose.model('Focus', FocusSchema, 'focus')
}
