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


const Roles = () => {

  const viewRoles = () => {
    db.query(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      LEFT JOIN department
      ON role.department_id = department.id
    `, (err, roles) => {
      if (err) { console.log(err) }
      console.table(roles)
    })
  }

  viewRoles()

  const Add = () => {

    db.query('SELECT * FROM department', (err, departments) => {
      if (err) { console.log(err) }

      departments = departments.map(department => ({
        name: department.name,
        value: department.id
      }))


      prompt([
        {
          type: 'input',
          name: 'title',
          message: "What is the name of the title ?"
        },
        {
          type: 'number',
          name: 'salary',
          message: "How much is the salary for this role ?"
        },
        {
          type: 'list',
          name: 'department',
          message: "Which department does it belong to ?",
          choices: departments
        }
      ])
        .then(role => {
          db.query('INSERT INTO items SET ?', role, (err) => {
            if (err) { console.log(err) }
            console.log('Role Created')
            Roles()
          })

        })
        .catch(err => console.log(err))
    })
  }

  const Update = () => {

    db.query('SELECT * FROM role', (err, roles) => {
      if (err) { console.log(err) }

      roles = roles.map(role => ({
        name: role.title,
        value: role.id
      }))

      prompt([
        {
          type: 'list',
          name: 'title',
          message: "Which role would you like to update ?",
          choices: roles
        },
        {
          type: 'list',
          name: 'detail',
          message: "What would you like to update ?",
          choices: ["title", "salary"]
        },
        {
          type: 'input',
          name: 'text',
          message: "What is the new value ?"
        }
      ])
        .then(res => {
          switch (res.detail) {
            case "title":
              db.query('UPDATE role SET title = ?', res.text, err => {
                if (err) { console.log(err) }
                Roles()
              })
              break;
            case "salary":
              db.query('UPDATE role SET salary = ?', res.text, err => {
                if (err) { console.log(err) }
                Roles()
              })
              break;
          }
        })
        .catch(err => console.log(err))
    })
  }

  const Delete = () => {

    db.query('SELECT * FROM role', (err, roles) => {
      if (err) { console.log(err) }

      roles = roles.map(role => ({
        name: role.title,
        value: role.id
      }))

      prompt([
        {
          type: 'list',
          name: 'title',
          message: "Which role would you like to delete ?",
        choices: roles
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
              db.query('DELETE FROM employee WHERE id = ?', res.title, err => {
                if (err) { console.log(err) }
                Roles()
              })
              break
            case "No, please go back":
              Roles()
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
      choices: ["Add", "Update", "Delete", "Main Menu"]
    }
  ])
    .then(({ action }) => {
      switch (action) {
        case "Add":
          Add()
          break;
        case "Update":
          Update()
          break;
        case "Delete":
          Delete()
          break;
        case "Main Menu":
          questions()
          break;
      }
    })
    .catch(err => { console.log(err) })
}

module.exports = Roles