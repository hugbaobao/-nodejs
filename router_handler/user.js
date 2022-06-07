const db = require('../db/index')

const bcrypt = require('bcryptjs')

// 导入token生成模块
const jwt = require('jsonwebtoken')
// 导入密钥
const config = require('../config')

// 留言处理函数
exports.Message = (req,res)=>{
const userinfo = req.body
if(!userinfo.phone){
 return res.cc('联系方式不能为空！')
}
const sql = 'insert into message_users set ?' 
db.query(sql,{message:userinfo.message,phone:userinfo.phone},(err,results)=>{
if (err) return res.cc(err)
if (results.affectedRows !== 1) {
  return res.cc('留言失败，请稍后再试')
}
res.cc('留言成功！',0)
}) 
} 

// 登录
exports.login = (req,res)=>{
  const logininfo = req.body
  const sql = `select * from admin where username=?`
  db.query(sql,logininfo.username,(err,results)=>{
    if (err) return res.cc(err)
    if (results.length !== 1) {
      return res.cc('无此用户注册信息！')
  }
  // 模拟一个加密的数据
  const mock = bcrypt.hashSync('17858757375', 10)
  const compareResult = bcrypt.compareSync(logininfo.password, mock)
  if(!compareResult){
   return res.cc('密码错误！')
  }
  const user = { ...results[0], password: '' }
   // 生成token,token 有效期为 10 个小时
   const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '168h' })
   res.send({
    status: 0,
    message: '登录成功！',
    token: 'Bearer ' + tokenStr,
})
  })
}

// 获取留言处理函数
exports.CheckMessage = (req,res)=>{
// res.send('CheckMessage OK')
const sql = `select * from message_users`
db.query(sql,(err,results)=>{
  if (err) return res.cc(err)
  if (results.length === 0) {
    return res.cc('暂无数据！')
}
res.send({
  status:0,
  data:results
})
})
  }