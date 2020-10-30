const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require("./lib/Employee");
const mysql = require("mysql")
const inquirer = require("inquirer");
const cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDb"
  });


connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  
function init() {

	inquirer
        .prompt([{
			type: "list",
			name: "doWhat",
			message: "What would you like to do",
			choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role"]
		}]).then(function(response) {
            if( response.doWhat === "Add Department" ){
				addNewDepartment();
			}
            else if ( response.doWhat === "Add Role" ){
				addNewRole();
            }
            else if ( response.doWhat === "Add Employee" ){
				addNewEmployee();
            }
            else if ( response.doWhat === "View Departments" ){
				viewDepartments();
            }
            else if ( response.doWhat === "View Roles" ){
				viewRoles();
            }
            else if ( response.doWhat === "View Employees" ){
				viewEmployees();
            }
            else if ( response.doWhat === "Update Employee Role" ){
				updateEmployeeRole();
            }
		});
}


function addNewDepartment(){
	inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "What is the department's name?"
		}
	])
	.then(function(departmentResult) {
		var newDepartment = new Department(departmentResult.name);
        var query = connection.query(
              "INSERT INTO department SET ?",
              {
                name: newDepartment.name,
              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                updateProduct();
              }
            );
          
            // logs the actual query being run
            console.log(query.sql);
          
}


function addNewRole(){
	var departmentList = [{name: "Test Dept", value: 1}, {name: "Dept Test", value: 2}];

	inquirer.prompt([
		{
			type: "input",
			name: "title",
			message: "What is the role's title?"
		},
		{
			type: "input",
			name: "salary",
			message: "What is the role's salary?"
		},
		{
			type: "list",
			name: "department_id",
			message: "What is the role's department?",
			choices: departmentList
		}
	])
	.then(function(roleResult) {
		var newRole = new Role(roleResult.title, roleResult.salary, roleResult.department_id);

	});
}


function addNewEmployee(){
	var roleList = [{name: "Test Role", value: 1}, {name: "Role Test", value: 2}];
	var employeeList = [{name: "None", value: null}];

	inquirer.prompt([
		{
			type: "input",
			name: "first_name",
			message: "What is the employee's first name?"
		},
		{
			type: "input",
			name: "last_name",
			message: "What is the employee's last name?"
		},
		{
			type: "list",
			name: "role_id",
			message: "What is the employee's role?",
			choices: roleList
		},
		{
			type: "list",
			name: "manager_id",
			message: "who is the employee's role?",
			choices: employeeList
		}
	])
	.then(function(employeeResult) {
		var newEmployee = new Employee(employeeResult.first_name, employeeResult.last_name, employeeResult.role_id, employeeResult.manager_id);

	});
}


function viewDepartments(){
    connection.query("SELECT * FROM department", function(err, data) {
        if (err) throw err;
        console.table(data);

      });

}


function viewRoles(){
    var sql="SELECT role.title, role.salary, department.name AS departmentName FROM role";
    sql+=" INNER JOIN department";
    sql+=" ON (department.id=role.department_id)";
    sql+=" ORDER BY department.name, role.title"; 
    connection.query(sql, function(err, data) {
        if (err) {
            throw err;
        
        }
        console.table(data);
    
        // console.log(data[0].RESULT);
      });
}


function viewEmployees(){
    connection.query("SELECT * FROM employee", function(err, data) {
        if (err) throw err;
        console.table(data);

      });

}


function updateEmployeeRole(){

}


init();