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

//Create a function to manage employee tables
const Employees = () => {

  //original prompted question to view an employee table
  const viewAllEmployee = () => {
    db.query(`
      SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, role.salary, department.name AS department,
        CONCAT(manager.name) AS manager
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      LEFT JOIN manager
      ON employee.manager_id = manager.id
      `, (err, allEmployee) => {
      if (err) { console.log(err) }
      console.table(allEmployee)
    })
  }

  viewAllEmployee()
  //Add an employee
  const Add = () => {

    db.query('SELECT * FROM role', (err, roles) => {
      if (err) { console.log(err) }

      roles = roles.map(role => ({
        name: role.title,
        value: role.id
      }))


      db.query('SELECT * FROM manager', (err, managers) => {
        if (err) { console.log(err) }

        managers = managers.map(manager => ({
          name: manager.name,
          value: manager.id
        }))


        prompt([
          {
            type: 'input',
            name: 'first_name',
            message: "What is the first name ?"
          },
          {
            type: 'input',
            name: 'last_name',
            message: "What is the last name ?"
          },
          {
            type: 'list',
            name: 'role_id',
            message: "What is the role ?",
            choices: roles
          },
          {
            type: 'list',
            name: 'manager_id',
            message: "What is the manager's name ?",
            choices: managers
          }
        ])
          .then(employee => {

            db.query('INSERT INTO employee SET ?', employee, (err) => {
              if (err) { console.log(err) }
              Employees()
            })
          })
          .catch(err => { console.log(err) })
      })
    })
  }

  //Update an employee
  const Update = () => {

    db.query('SELECT * FROM employee', (err, employees) => {
      if (err) { console.log(err) }

      employees = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))


      prompt([
        {
          type: 'list',
          name: 'employee',
          message: "Which employee would you like to choose ?",
          choices: employees
        },
        {
          type: 'list',
          name: 'category',
          message: "What would you like to update ?",
          choices: ["first_name", "last_name", "role", "manager"]
        },
      ])
        .then(res => {
          let chooseEmpl = res.employee

          switch (res.category) {
            case "first_name":
              prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: "What is the new value ?"
                }
              ])
                .then(({ firstName }) => {
                  db.query(`
                UPDATE employee
                SET first_name = firstName
                WHERE employee.id = chooseEmpl
              `)
                  Employees()
                })
                .catch(err => { console.log(err) })
              break;

            case "last_name":
              prompt([
                {
                  type: 'input',
                  name: 'lastName',
                  message: "What is the new value ?"
                }
              ])
                .then(({ lastName }) => {
                  db.query(`
                UPDATE employee
                SET last_name = lastName
                WHERE employee.id = chooseEmpl
              `)
                  Employees()
                })
                .catch(err => { console.log(err) })
              break;

            case "role":

              db.query('SELECT * FROM role', (err, roles) => {
                if (err) { console.log(err) }

                roles = roles.map(role => ({
                  name: role.title,
                  value: role.id
                }))


                prompt([
                  {
                    type: 'list',
                    name: 'updateRole',
                    message: "What is the new role ?",
                    choices: roles
                  }
                ])
                  .then(({ updateRole }) => {
                    db.query(`
              UPDATE employee
              SET role_id = updateRole
              WHERE employee.id = chooseEmpl
              `)
                    Employees()
                  })
                  .catch(err => { console.log(err) })
              })
              break;

            case "manager":
              db.query('SELECT * FROM manager', (err, managers) => {
                if (err) { console.log(err) }

                managers = manager.map(manager => ({
                  name: manager.name,
                  value: manager.id
                }))


                prompt([
                  {
                    type: 'list',
                    name: 'updateManager',
                    message: "What is the new manager ?",
                    choices: managers
                  }
                ])
                  .then(({ updateRole }) => {
                    db.query(`
              UPDATE employee
              SET manager_id = updateManager
              WHERE employee.id = chooseEmpl
              `)
                    Employees()
                  })
                  .catch(err => { console.log(err) })
              })
              break;
          }

        })
        .catch(err => { console.log(err) })
    })
  }

  //Delete an employee
  const Delete = () => {

    db.query('SELECT * FROM employee', (err, employees) => {
      if (err) { console.log(err) }

      employees = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))


      prompt([
        {
          type: 'list',
          name: 'name',
          message: "Which employee would you like to choose ?",
          choices: employees
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
              db.query('DELETE FROM employee WHERE id = ?', res.name, err => {
                if (err) { console.log(err) }
                Employees()
              })
              break
            case "No, please go back":
              Employees()
              break
          }

        })
        .catch(err => { console.log(err) })
    })
  }

  //choose what action to take
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do ?',
      choices: ["Add", "Update", "Delete", "Main Menu"]
    }
  ])
    .then(({ action }) => {
      switch (action) {
        case 'Add':
          Add()
          break;
        case 'Update':
          Update()
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

module.exports = Employees