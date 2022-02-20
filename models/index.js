const Employee = require("./Employee");
const Manager = require("./Manager");

Manager.hasMany(Employee, {
  foreignKey: "manager_id",
  constraints: false,
});
Employee.belongsTo(Manager, {
  foreignKey: "manager_id",
  constraints: false,
});

module.exports = { Employee, Manager };
