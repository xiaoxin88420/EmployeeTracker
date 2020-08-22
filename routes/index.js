const inquirer = require("inquirer");

const { prompt } = require('inquirer')
const { join } = require('path')

const Employees = () => {
  prompt([
    {
      type: 'list',
      name: 'viewTable',
      message: 'How would you like to display the table ?',
      choices: ["View Employees", "View Employees By Roles", "View Employees By Department", "View Employees By Manager"]
    }
  ])
    .then()
    .catch(err => { console.log(err) })
}

const Roles = () => {
  prompt([])
    .then()
    .catch(err => { console.log(err) })
}

const Departments = () => {
  prompt([])
    .then()
    .catch(err => { console.log(err) })
}

const Managers = () => {
  prompt([])
    .then()
    .catch(err => { console.log(err) })
}


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
          break
        case 'Roles':
          break
        case 'Departments':
          break
        case 'Managers':
          break
      }
    })
    .catch(err => { console.log(err) })
}

questions()