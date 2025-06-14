import express from "express";
import employees from "#db/employees";

const app = express();

export default app;

//write the most specific route first

//get a random employee -- only worked in this location! surprising!
app.route("/employees/random").get((request, response) => {
  const randomID = Math.floor(Math.random() * employees.length);
  response.send(employees[randomID]);
});

//getting specific employee by id
app.route("/employees/:id").get((request, response) => {
  const { id } = request.params;
  console.log(id);

  if (isNaN(+id) || +id < 0 || +id >= employees.length) {
    return response
      .status(404)
      .send("That employee does not exist in the database.");
  }

  response.send(employees[+id]);
});

//returning all employees
app.route("/employees").get((request, response) => {
  response.send(employees);
});

//returning a string
app.route("/").get((request, response) => {
  response.send("Hello employees!");
});
