const express = require('express')

// 创建路由对象
const router = express.Router()

// 挂载路由
// 导入路由处理函数
const userHandler = require('../router_handler/user')

// 导入验证数据的中间件
const expressjoi = require('@escook/express-joi')
// 导入定义规则的的包
const { schema_login } = require('../schema/user')

// 留言
router.post('/message',userHandler.Message)

// 登录
router.post('/login',expressjoi( schema_login),userHandler.login)

// 获取留言
router.get('/checkmessage',userHandler.CheckMessage)

module.exports = router