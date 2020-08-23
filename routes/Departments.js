
const Departments = () => {

  console.table()

  const Add = () => {
    prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the name of the department ?"
      }
    ])
      .then(res => {
        console.table()
        Departments()
      })
      .catch(err => { console.log(err) })
   }

  const Update = () => {
    prompt([
      {
        type: 'list',
        name: 'choose',
        message: "Which department would you like to update ?",
        choices: []
      },
      {
        type: 'input',
        name: 'name',
        message: "What is the new name of the department ?"
      }
    ])
      .then(res => {
        console.table()
        Departments()
      })
      .catch(err => { console.log(err) })
   }

  const Delete = () => { 
    prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which department would you like to delete ?"
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
            db.query('DELETE FROM employee WHERE id = ?', req.params.id, err => {
              if (err) { console.log(err) }
            })
            console.table()
            break
          case "No, please go back":
            Departments()
            break
        })
      .catch(err => console.log(err))
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

module.exports = Departments