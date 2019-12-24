'use strict'

const Controller = require('./base.js')
const pump = require('mz-modules/pump')
const path = require('path')
const fs = require('fs')
class FocusController extends Controller {
  async index() {
    //1. 上传文件 需要前端 form 中设置  enctype="multipart/form-data"
    //2. 后台 无法使用this.ctx.request.body 获取 文件
    // 获取轮播图数据
    let result = await this.ctx.model.Focus.find();
    console.log(result)
    await this.ctx.render('admin/focus/index' , {
      list:result
    })
  }
  async edit() {
    //1. 上传文件 需要前端 form 中设置  enctype="multipart/form-data"
    //2. 后台 无法使用this.ctx.request.body 获取 文件
    console.log('参数',this.ctx.request.query);
    let id = this.ctx.request.query._id;
    // 获取轮播图数据
    let result = await this.ctx.model.Focus.find({'_id':id});
    console.log('轮播图数据',result)
    await this.ctx.render('admin/focus/edit' , {
      data:result[0]
    })
  }
  async doEdit() {
    console.log('上传')
    const parts = this.ctx.multipart({
      autoFields: true
    })
    let stream
    let files = {}
    
    // this.ctx.body = path;
    while ((stream = await parts()) != null) {
      console.log('循环', stream)
      if (!stream.fieldname) {
        break
      }
      // 表单中的其他数据

      let filename = stream.filename // 文件名
      let fieldname = stream.fieldname  // 文件类型
      // console.log('流')
      let pathObj = await this.service.tools.getUploadFile(filename);
      // 上传文件目录
      const targetPath = pathObj.uploadDir

      // 创建写入流
      const writeStream = fs.createWriteStream(targetPath)
      // const result = stream.pipe(writeStream);
      // 写入 并且销毁流
      await pump(stream, writeStream)
      // console.log('完毕')
      files = Object.assign(files,{
        [fieldname]: pathObj.saveDir
      })
    }
    console.log('上传完毕')
    let body = Object.assign(files,parts.field);
    // 获取轮播图数据
    let id = parts.field.id
    let result = await this.ctx.model.Focus.updateOne({'_id':id}, body);
    // console.log(result);
    await this.success('/admin/focus', '修改轮播图成功');
  }
  async upload() {
    await this.ctx.render('admin/focus/upload')
  }
  /**
   * 单个文件上传
   */
  async doUpload() {
    // 1. 获取表单提交的数据
    const stream = await this.ctx.getFileStream()
    // 表单中的其他数据
    const fields = stream.fields
    console.log(stream)

    if (!stream.filename) {
      return
    }
    // 上传文件目录
    const targetPath =
      'app/public/admin/upload/' + path.basename(stream.filename)

    // 创建写入流
    const writeStram = fs.createWriteStream(targetPath)
    // const result = stream.pipe(writeStream);
    await pump(stream, writeStream)

    this.ctx.body = {
      url: targetPath,
      fields
    }
  }
  /**
   * 获取多个文件流
   */
  async doMultiUpload() {
    console.log('上传')
    const parts = this.ctx.multipart({
      autoFields: true
    })
    let stream
    let files = {}
    
    // this.ctx.body = path;
    while ((stream = await parts()) != null) {
      console.log('循环', stream)
      if (!stream.fieldname) {
        break
      }
      // 表单中的其他数据

      let filename = stream.filename // 文件名
      let fieldname = stream.fieldname  // 文件类型
      // console.log('流')
      let pathObj = await this.service.tools.getUploadFile(filename);
      // 上传文件目录
      const targetPath = pathObj.uploadDir

      // 创建写入流
      const writeStream = fs.createWriteStream(targetPath)
      // const result = stream.pipe(writeStream);
      // 写入 并且销毁流
      await pump(stream, writeStream)
      // console.log('完毕')
      files = Object.assign(files,{
        [fieldname]: pathObj.saveDir
      })
    }
    console.log('上传完毕')
    // let body = {
    //   files: files,
    //   fields: parts.field // 所有表单字段都能通过 `parts.fields` 获取到 };
    // }
    let body = Object.assign(files,parts.field);
    let focus =  new this.ctx.model.Focus(body);
    let result = await focus.save()
    console.log(result);
    await this.success('/admin/focus', '添加轮播图成功');
  }
}

module.exports = FocusController
