const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let empArr=[];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function init() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
              },
              {
                type: "input",
                message: "What is your id?",
                name: "id"
              },
              {
                type: "input",
                message: "What is your email?",
                name: "email"
              },
              {
                type: "list",
                name: "role",
                message: "Select role:",
                choices: ["manager","engineer","intern"]
              },
        ])
        .then(function(response) {
            if(response.role === "manager"){
                inquirer.prompt([
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "what is your office number?",
                    }
                ])
                .then(function(managerResult) {
                    let newManager= new Manager(response.name, response.id, response.email, managerResult.officeNumber);
                    console.log(newManager);
                    empArr.push(newManager);
                    // console.log(managerresult);
                    // console.log(response);
                    addNewEmployee();

                });
            }
            else if (response.role==="engineer"){
                inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "what is your github username?",
                    }
                ])
                .then(function(engineerResult) {
                    var newEngineer= new Engineer(response.name, response.id, response.email, engineerResult.github);
                    console.log(newEngineer);
                    empArr.push(newEngineer);
                    addNewEmployee();

                });
            }
            else if (response.role==="intern"){
                inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "what is your school?",
                    }
                ])
                .then(function(internResult) {
                    var newIntern= new Intern(response.name, response.id, response.email, internResult.school);
                    console.log(newIntern);
                    empArr.push(newIntern);
                    addNewEmployee();
                });
            }

          });          
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function addNewEmployee(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "addanother",
            message: "Would you like to add an additional employee?",
        }
    ])
    .then(function(response){
        if(response.addanother===true){
            init();
        }
        else {
            var teamHtml = render (empArr)
            fs.writeFileSync("./output/team.html", teamHtml, function(err) {
                console.log(err);
        });
        }
    })
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
init();