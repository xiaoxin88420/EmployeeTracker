
const Roles = () => {

  console.table()

  const Add = () => {
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
        message: "Which department does it belong to ?"
        choices: []
      }
    ])
    .then(res => {
      db.query('INSERT INTO items SET ?', res, (err, fields) => {
        if (err) { console.log(err) }
        res.json({ id: fields.insertId })
      })

      console.table()
      Roles()
    })
    .catch(err => console.log(err))
  }

  const Update = () =>{
    prompt([
      {
        type: 'list',
        name: 'title',
        message: "Which role would you like to update ?"
        choices: []
      },
      {
        type: 'list',
        name: 'detail',
        message: "What would you like to update ?"
        choices: ["title", "salary", "department"]
      }
    ])
      .then(res => {
        console.table()
        Roles()
      })
      .catch(err => console.log(err))
  }

  const Delete = () => {
    prompt([
      {
        type: 'list',
        name: 'title',
        message: "Which role would you like to delete ?"
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
            Roles()
            break
      })
      .catch(err => console.log(err))
  }


  prompt([
    {
      type: 'list',
      name: 'action',
      message: "What would you like to do ?"
      choices: ["Add", "Update", "Delete", "Main Menu"]
    }
  ])
    .then(({action}) => {
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