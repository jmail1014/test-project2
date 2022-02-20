const { Employee } = require("../models");

const employeeData = [
  {
    manager_id: 1,
    last_day: "2020-01-30",
    symptom_start: "2020-01-28",
  },
];

const seedEmployees = () =>
  Employee.bulkCreate(employeeData, { individualHooks: true });

module.exports = seedEmployees;
