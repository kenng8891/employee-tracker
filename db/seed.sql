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
VALUES ("Sales Associate", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("IT Manager", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Financial Advisor", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 250000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bilbo", "Baggins", 2, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", 3, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Loid", "Forger", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Domon", "Kasshu", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Clark", "Kent", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Sparrow", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ash", "Ketchum", 1, null);

