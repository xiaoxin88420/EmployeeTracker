const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '621120?Jfjjfz',
  database: 'todo_db'
})

module.exports = db

