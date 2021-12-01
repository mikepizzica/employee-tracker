const inquirer = require('inquirer');
const connection = require('./db/connection.js');
const db = require ('./db/queries.js');

let departments = [];
let employees = [];
let roles = [];

choice = () =>{
db.findDepartments().then((rows) =>{
  rows.forEach(department => {
    departments.push(department.department_name);
  });
})

  inquirer
    .prompt([
      {
        type: "list", 
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
      if(response.selection === "add a role") {
        addrole();
      }

    });
}
choice()

function viewdepartments(){
  connection.query("SELECT * FROM department", function(err, data){
    if(err) throw err;
    console.table(data);
    choice();
  })
}

function viewroles(){
  connection.query("SELECT * FROM role", function(err, data){
    if(err) throw err;
    console.table(data);
    choice();
  })
}

function viewemployees(){
  connection.query("SELECT * FROM employee", function(err, data){
    if(err) throw err;
    console.table(data);
    choice();
  })
}

function adddepartment(){
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'name'
    }
  ])
  .then((response) => {
    console.log(response.name);
    connection.query(`INSERT INTO department (name) VALUES ("${response.name}")`, 
    function(err, data){
      if(err) throw err;
      console.log(`Added ${response.name} to the database`);
      choice();
    })
  })
}

function addrole(){
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'roleName'
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'salary'
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'roleDepartment',
      choices: departments
    }
  ])
  .then((response) => {
    console.log(response.name)
    console.log(response.salary)
    console.log(response.departments)
    connection.query(`INSERT INTO role VALUES ("${response.roleName}", ${response.salary}, "${response.roleDepartment}")`,
    function(err, data){
      if(err) throw err;
      console.log(`Added ${response.name} to the database`);
      choice();
    })
  })
}