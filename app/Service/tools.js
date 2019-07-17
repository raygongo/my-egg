'use strict'

const Service = require('egg').Service
const md5 = require('md5')
const svgCaptcha = require('svg-captcha')
const mkdirp = require('mz-modules/mkdirp')
const dayjs = require('dayjs')
const path = require('path')
class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966'
    })
    this.ctx.session.code = captcha.text
    return captcha
  }
  async md5(value) {
    return md5(value)
  }
  async getTime() {
    return new Date().getTime()
  }
  async getUploadFile(fileName) {
    // 1. 获取当前日期
    let day = dayjs(new Date()).format('YYYYMMDD')
    // 2. 创建目录
    let dir = path.join(this.config.uploadDir, day)
    // 3. 生成目录
    await mkdirp(dir)
    // 4. 创建时间戳 
    let name = await this.getTime()
    // 5. 利用时间戳 重命名文件 + 文件路径
    let uploadDir = path.join(dir, name + path.extname(fileName))
    // 6. 返回文件地址 && 数据库存储地址 (数据库中的地址 需要 对 \进行转义)
    let target = {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/')
    }
    return target;
  }
}

module.exports = ToolsService
