// TODO: Write code to define and export the Employee class
class Employee{
        constructor (name, id, email) {
            this.name=name;
            this.id=id;
            this.email=email;
        }
            getName(){
                return this.name;
            }
            getId(){
                return this.id;
            
            }
    
            getEmail(){
                return this.email;
            }
    
            getRole(){
                return "Employee";

            }
} 

// var ob = new Employee("Tom",1, "t@test.com");
// var ob2 = new Employee("Henry", 2, "h@test.com");

// console.log(ob, ob2);
// ob.getName();

module.exports=Employee;