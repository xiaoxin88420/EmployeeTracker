const { prompt } = require('inquirer')
const { join } = require('path')
const cTable = require('console.table')
const Employees = require('./Employees')
const Roles = require('./Roles')
const Departments = require('./Departments')
const Managers = require('./Managers')


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