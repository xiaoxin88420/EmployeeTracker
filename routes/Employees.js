//Create a function to manage employee tables
const Employees = () => {

  //Add an employee
  const Add = () => {
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
        name: 'role',
        message: "What is the role ?",
        choices: []
      },
      {
        type: 'list',
        name: 'manager',
        message: "What is the manager's name ?",
        choices: []
      }
    ])
      .then(res => {

        db.query('INSERT INTO items SET ?', res, (err, fields) => {
          if (err) { console.log(err) }
          res.json({ id: fields.insertId })
        })
        console.table()
        Employees()
      })
      .catch(err => { console.log(err) })
  }

  //Update an employee
  const Update = () => {
    prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to choose ?",
        choices: []
      },
      {
        type: 'list',
        name: 'category',
        message: "What would you like to update ?",
        choices: ["first_name", "last_name", "role", "manager"]
      }
    ])
      .then(res => {
        switch (res.category) {
          case "first_name":
            
            break;
          case "last_name":

            break;
          case "role":

            break;
          case "manager":

            break;
        }
        console.table()
        Employees()
       })
      .catch(err => { console.log(err) })
  }

  //Delete an employee
  const Delete = () => {
    prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to choose ?",
        choices: []
      },
      {
        type: 'list',
        name: 'final',
        message: "Please confirm to delete."
        choices: ["Yes, please delete", "No, please go back"]
      }
    ])
      .then(res => {
        switch (res.final) {
          case "Yes, please delete":
            db.query('DELETE FROM employee WHERE id = ?', req.params.id, err =>{
              if (err) {console.log(err)}
            })
            console.table()
            break
          case "No, please go back":
            Employees()
            break
        }
        
      })
      .catch(err => { console.log(err) })
  }


  //original prompted question to view an employee table
  prompt([
    {
      type: 'list',
      name: 'viewTable',
      message: 'How would you like to display the table ?',
      choices: ["View All Employees", "View Employees By Roles", "View Employees By Department", "View Employees By Manager"]
    }
  ])
    .then(res => {

      console.table()

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
              questions()
              break;
          }
        })
        .catch(err => { console.log(err) })
    })
    .catch(err => { console.log(err) })
}

module.exports = Employees