
const Employees = () => {

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
        Action()
      })
      .catch(err => { console.log(err) })
  }

  const Update = () => {
    prompt([])
      .then()
      .catch(err => { console.log(err) })
  }

  const Delete = () => {
    prompt([])
      .then()
      .catch(err => { console.log(err) })
  }


  const Action = () => {
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
  }


  prompt([
    {
      type: 'list',
      name: 'viewTable',
      message: 'How would you like to display the table ?',
      choices: ["View All Employees", "View Employees By Roles", "View Employees By Department", "View Employees By Manager"]
    }
  ])
    .then(({ viewTable }) => {
      switch (viewTable) {
        case 'View All Employees':
          Action()
          break;
        case 'View Employees By Roles':
          Action()
          break;
        case 'View Employees By Department':
          Action()
          break;
        case 'View Employees By Manager':
          Action()
          break;
      }


    })
    .catch(err => { console.log(err) })
}

module.exports = Employees