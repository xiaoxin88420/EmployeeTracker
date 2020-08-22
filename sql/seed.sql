USE employee_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Legal'), ('Finance');

USE employee_db;

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 190000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 4),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

USE employee_db;

INSERT INTO manager (name)
VALUES ('Ashley Rodrigues'), ('John Doe'), ('Sarah Lourd');

USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 1),
('Mike', 'Chan', 2, 2),
('Ashley', 'Rodrigues', 3, 0),
('Kevin', 'Tupik', 4, 1),
('Malia', 'Brown', 5, 0),
('Sarah', 'Lourd', 6, 0),
('Tom', 'Allen', 7, 3);