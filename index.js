const { prompt } = require('inquirer')
require('console.table')
const mysql = require('mysql2')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '621120?Jfjjfz',
  database: 'employee_db'
})
const Employees = require('./routes/Employees')
const Roles = require('./routes/Roles')
const Departments = require('./routes/Departments')
const Managers = require('./routes/Managers')


const questions = () => {
  prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Which category would you like to choose ?',
      choices: ["Employees", "Roles", "Departments", "Managers"]
    }
  ])
    .then(({ category }) => {
      switch (category) {
        case 'Employees':
          Employees()
          break
        case 'Roles':
          Roles()
          break
        case 'Departments':
          Departments()
          break
        case 'Managers':
          Managers()
          break
      }
    })
    .catch(err => { console.log(err) })
}

questions()

module.exports = questions