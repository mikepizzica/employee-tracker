const inquirer = require('inquirer');
const connection = require('./db/connection.js');
const table = require("console.table");

// maybe put this in function
inquirer
  .prompt([
    {
      type: "list", // checkbox or list
      message: "What would you like to do?",
      name: "selection",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a row", "add an employee", "update an employee's role"]
    }
  ])
  .then((response) => {
    if(response.selection === "view all departments") {
      viewdepartments();
    }

  });

function viewdepartments(){
  connection.query("SELECT * FROM department", function(err, data){
    if(err) throw err;
    console.table(data);
    // menu options function here
  })
}