USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("IT");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("IT Manager", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Financial Advisor", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bilbo", "Baggins", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Loid", "Forger", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Domon", "Kasshu", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Clark", "Kent", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Sparrow", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ash", "Ketchum", 1, 2);

