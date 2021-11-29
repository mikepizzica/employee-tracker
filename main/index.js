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
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee's role"]
    }
  ])
  .then((response) => {
    if(response.selection === "view all departments") {
      viewdepartments();
    }
    if(response.selection === "view all roles") {
      viewroles();
    }
    if(response.selection === "view all employees") {
      viewemployees();
    }
    if(response.selection === "add a department") {
      adddepartment();
    }

  });

function viewdepartments(){
  connection.query("SELECT * FROM department", function(err, data){
    if(err) throw err;
    console.table(data);
    // menu options function here
  })
}

function viewroles(){
  connection.query("SELECT * FROM role", function(err, data){
    if(err) throw err;
    console.table(data);
    // menu options function here
  })
}

function viewemployees(){
  connection.query("SELECT * FROM employee", function(err, data){
    if(err) throw err;
    console.table(data);
    // menu options function here
  })
}

function adddepartment(){
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the dapartment?',
      name: 'departmentname'
    }
  ])
  .then((response) => {
    console.log(response);
  })
}