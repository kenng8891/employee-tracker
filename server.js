const db = require('./db/connection.js');
const inquirer = require("inquirer");

// Start server after DB connection
db.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    firstPrompt();
  });

  // function which prompts the user for what action they should take
function firstPrompt() {

    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Would you like to do?",
        choices: [
          "View Employees",
          "View Employees by Department",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "End"]
      })
      .then(function ({ task }) {
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employees":
            removeEmployees();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Add Role":
            addRole();
            break;
          case "End":
            db.end();
            break;
        }
      });
  }

//1. View Employees
function viewEmployee() {
    console.log("Viewing employees\n");

    var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager    
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`

    db.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Employees viewed!\n");
    
        firstPrompt();
      });
}

//2. View Employees by Department
function viewEmployeeByDepartment() {
    console.log("Employees by department\n");

    const query = 
    `SELECT d.id, d.name
    FROM department d`

db.query(query, function (err, res) {
    if (err) throw err;

    const deptChoice = res.map(data => ({ 
        value: data.id, name: data.name 
    }));
    console.table(res)
    promptDepartment(deptChoice)
});
}

function promptDepartment(deptChoice) {
    
    inquirer
        .prompt([
            {
                type: "list",
                name: "departmentId",
                message: "Choose which department",
                choices: deptChoice
            }
        ])
        .then (function (answer) {
            console.log("answer ", answer.departmentId);
        
        const query = 
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
        FROM employee e
        JOIN role r
        ON e.role_id = r.id
        JOIN department d 
        ON d.id = r.department_id
        WHERE d.id = ?`
        
        db.query(query, answer.departmentId, function (err, res) {
            if (err) throw err;
    
            console.table(res);
            console.log(res.affectedRows + "Employees are viewed!\n");
    
            firstPrompt();
        });
    });
}

//3. Add Employee

function addEmployee () {
  console.log("Adding an employee")

  const query = 
    `SELECT role.id, role.title, role.salary FROM role`

  db.query(query, function (err, res) {
    if (err) throw err;

  const roles = res.map(({ id, title, salary}) => ({
    value: id, title: `${title}`, salary: `${salary}`
  }));

  console.table(res);
  console.log("roles picker")

  promptRoles(roles)
  });
}

function promptRoles(roles) {
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roles
      },
      {
        type: "input",
        name: "manager_id",
        message: "what is the employee's manager ID"
      },
    ])

    .then(function (answer) {
      console.log(answer);

    const query = `INSERT INTO employee SET ?`

    db.query(query, 
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.roleId,
        manager_id: answer.manager_id
      },
      function (err, res) {
        if (err) throw err;

        console.table(res);

        firstPrompt();
      });
  });
}

//4. Remove Employees

function removeEmployees() {
  console.log("Deleting an employee")

  const query = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`

  db.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployee = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res)
    
    promptDelete(deleteEmployee)
  })
}
function promptDelete(deleteEmployee) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to delete?",
        choices: deleteEmployee
      }
    ])
    .then(function (answer) {

      const query = `DELETE FROM employee WHERE ?`;

      db.query(query, { id: answer.employeeId}, function (err, res) {
        if (err) throw err;

        console.table(res);

        firstPrompt()
      });
    });
}

//5. Update Employee Role

function updateEmployeeRole () {
  employeeArray();

}

  function employeeArray () {
    console.log("Update employee role");

    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    JOIN employee m
    ON m.id = e.manager_id`

    db.query(query, function (err, res) {
      if (err) throw err;

      const eChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`      
      }));

      console.table(res);

      roleArray(eChoices)
    });
}

function roleArray(eChoices) {
  console.log("Updating a role");

  const query = `SELECT r.id, r.title, r.salary FROM role r`
  
  db.query(query, function (err, res) {
    if (err) throw err;

   const roleChoices = res.map(({ id, title, salary }) => ({
    value: id, title: `${title}`, salary: `${salary}`      
  }));

  console.table(res);

  promptRoles(eChoices, roleChoices);
  });
}

function promptRoles(eChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: eChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      const query = `UPDATE employee SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      db.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

          firstPrompt();
        });
    });
}

