const joi = require('joi')

// 定义验证规则
const username = joi.string().alphanum().min(3).max(10).required()

const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义验证规则的对象
exports.schema_login = {
  body:{
    username,
    password
  }
} 