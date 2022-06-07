// 导入express
const express = require('express')

// 配置跨域
const cors = require('cors')

// 创建服务器实例对象
const app =express()

const joi = require('joi')

// 将cors注册为全局中间件
app.use(cors())

// 配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

// 封装错误时的信息
app.use((req,res,next)=>{
  res.cc = function(err,status=1){
   res.send({
    status,
    message:err instanceof Error ? err.message :err
   })
  }
next()
})

// 导入使用路由模块
const userRouter = require('./router/user.js')
app.use('/api',userRouter)

// 定义错误级别中间件
app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError) return res.cc(err.message)
  res.cc(err)
})

// 启动服务器
app.listen(80,()=>{
  console.log("serve running at 127.0.0.1");
})