const { prompt } = require('inquirer')
require('console.table')
const mysql = require('mysql2')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '621120?Jfjjfz',
  database: 'employee_db'
})

const questions = require('../index.js')

const Managers = () => {

  const viewManagers = () => {
    db.query('SELECT * FROM manager', (err, managers) => {
      if (err) { console.log(err) }
      console.table(managers)
    })
  }

  viewManagers()

  const Add = () => {
    prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the name of the manager ?"
      }
    ])
      .then(res => {
        db.query('INSERT INTO manager SET ?', res, err => {
          if (err) { console.log(err) }
          console.log('Manager Created!')
          Managers()
        })
      })
      .catch(err => { console.log(err) })
  }

  const Delete = () => {

    db.query('SELECT * FROM manager', (err, managers) => {
      if (err) { console.log(err) }

      managers = managers.map(manager => ({
        name: manager.name,
        value: manager.id
      }))

      prompt([
        {
          type: 'list',
          name: 'name',
          message: "Which manager would you like to delete ?",
          choices: managers
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
              db.query('DELETE FROM manager WHERE id = ?', res.name, err => {
                if (err) { console.log(err) }
                Managers()
              })
              break
            case "No, please go back":
              Managers()
              break
          }
        })
        .catch(err => console.log(err))
    })


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
            questions()
            break;
        }
      })
      .catch(err => { console.log(err) })
  }
}
  module.exports = Managers