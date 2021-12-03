const inquirer = require('inquirer');
const connection = require('./db/connection.js');

choice = () => {
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
      if (response.selection === "view all departments") {
        viewdepartments();
      }
      if (response.selection === "view all roles") {
        viewroles();
      }
      if (response.selection === "view all employees") {
        viewemployees();
      }
      if (response.selection === "add a department") {
        adddepartment();
      }
      if (response.selection === "add a role") {
        addrole();
      }
      if (response.selection === "add an employee") {
        addemployee();
      }
      if (response.selection === "update an employee's role") {
        updateemployeerole();
      }
    });
}
choice()

function viewdepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    console.table(data);
    choice();
  })
}

function viewroles() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    console.table(data);
    choice();
  })
}

function viewemployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    console.table(data);
    choice();
  })
}

function adddepartment() {
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
        function (err, data) {
          if (err) throw err;
          console.log(`Added ${response.name} to the database`);
          choice();
        })
    })
}

function addrole() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    console.log(data);
    var departments = data.map(department => ({
      name: department.name,
      value: department.id
    }));
    console.log(departments)
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
        console.log(response.roleName)
        console.log(response.salary)
        console.log(response.roleDepartment)
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", ${response.salary}, "${response.roleDepartment}")`,
          function (err, data) {
            if (err) throw err;
            console.log(`Added ${response.roleName} to the database`);
            choice();
          })
      })
  })
}

function addemployee() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    var roles = data.map(role => ({
      name: role.title,
      value: role.id
    }));

    connection.query("SELECT * FROM employee", function (err, data) {
      if (err) throw err;
      console.log(data);
      var employees = data.map(employee => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id
      }));
      console.log(employees)

      inquirer.prompt([
        {
          type: 'input',
          message: 'What is the first name of the employee?',
          name: 'firstName'
        },
        {
          type: 'input',
          message: 'What is the last name of the employee?',
          name: 'lastName'
        },
        {
          type: 'list',
          message: "What is the employee's role?",
          name: 'role',
          choices: roles
        },
        {
          type: 'list',
          message: "Who is the employee's manager?",
          name: 'manager',
          choices: employees
        }
      ])
        .then((response) => {
          console.log(response);
          connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", ${response.role}, ${response.manager})`,
          function(err, data){
            if(err) throw err;
            console.log(`Added ${response.firstName} ${response.lastName} to the database`);
            choice();
          })
        })
    })
  })
}

function updateemployeerole() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    var roles = data.map(role => ({
      name: role.title,
      value: role.id
    }));

    connection.query("SELECT * FROM employee", function (err, data) {
      if (err) throw err;
      console.log(data);
      var employees = data.map(employee => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id
      }));
      console.log(employees)

      inquirer.prompt([
        {
          type: 'list',
          message: 'Which employee do you want to update?',
          name: 'employee',
          choices: employees
        },
        {
          type: 'list',
          message: 'Which role are they being updated to?',
          name: 'role',
          choices: roles
        }
      ])
        .then((response) => {
          console.log(response);
          connection.query(`UPDATE employee SET role_id = ${response.role} WHERE id = ${response.employee}`,
          function(err, data){
            if(err) throw err;
            console.log(`Updated employee's role`);
            choice();
          })
        })
    })
  })
}