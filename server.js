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