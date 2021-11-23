USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Customer Strategy"),
       ("Product"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 50000, 1),
       ("Sales Lead", 70000, 1),
       ("Customer Strategy Rep", 40000, 2),
       ("Customer Strategy Lead", 60000, 2),
       ("Product Strategist", 75000, 3),
       ("Product Lead", 95000, 3),
       ("Engineer", 100000, 4),
       ("Innovation Lead", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Anchor", 2, NULL),
       ("Brian", "Bob", 1, 1),
       ("Charlie", "Chocolate", 4, NULL),
       ("Doug", "Dog", 3, 3),
       ("Eric", "Ember", 6, NULL),
       ("Fred", "Fire", 5, 5);