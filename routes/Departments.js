const { prompt } = require('inquirer')
require('console.table')
const mysql = require('mysql2')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '621120?Jfjjfz',
  database: 'employee_db'
})
const Questions = require('../index')


const Departments = () => {

  const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, departments) => {
      if (err) { console.log(err) }
      console.table(departments)
    })
  }

  viewDepartments()

  const Add = () => {
    prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the name of the department ?"
      }
    ])
      .then(res => {
        db.query('INSERT INTO department SET ?', res, (err) => {
          if (err) { console.log(err) }
          console.log('Department Created!')
          Departments()
        })
      })
      .catch(err => { console.log(err) })
  }

  const Delete = () => {

    db.query('SELECT * FROM department', (err, departments) => {
      if (err) { console.log(err) }

      departments = departments.map(department => ({
        name: department.name,
        value: department.id
      }))

    prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which department would you like to delete ?",
        choices: departments
      },
      {
        type: 'list',
        name: 'final',
        message: "Please confirm to delete.",
        choices: ["Yes, please delete", "No, please go back"]
      }
    ])
      .then(res => {
        switch (res.final) {
          case "Yes, please delete":
            db.query('DELETE FROM department WHERE id = ?', res.name, err => {
              if (err) { console.log(err) }
              Departments()
            })            
            break
          case "No, please go back":
            Departments()
            break
        }
        })
      .catch(err => console.log(err))
    })
  }


  prompt([
    {
      type: 'list',
      name: 'action',
      message: "What would you like to do ?",
      choices: ["Add", "Delete", "Main Menu"]
    }
  ])
    .then(({ action }) => {
      switch (action) {
        case 'Add':
          Add()
          break;
        case 'Delete':
          Delete()
          break;
        case 'Main Menu':
          Questions()
          break;
      }
    })
    .catch(err => { console.log(err) })
}

module.exports = Departments