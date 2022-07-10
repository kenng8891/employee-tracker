const express = require('express');
const db = require('./db/connection.js');
const inquirer = require("inquirer");
// require("console.table");


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
            connection.end();
            break;
        }
      });
  }

//View Employees"/ READ all, SELECT * FROM
function viewEmployee() {
    console.log("Viewing employees\n");

    var query = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,  CONCAT(m.first_name, " ", m.last_name) AS manager
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
        console.log("Employees viewed")

        firstPrompt();
    });
}