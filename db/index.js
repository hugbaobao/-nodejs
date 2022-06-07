const mysql = require('mysql')

// 创建数据连接对象
const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'admin123',
  database:'message_board'
})

module.exports = db