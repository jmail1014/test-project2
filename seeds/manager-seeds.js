const { Manager } = require("../models");

const managerData = [
  {
    email: "jp@gmail.com",
    password: "password123",
  },
];

const seedManagers = () =>
  Manager.bulkCreate(managerData, { individualHooks: true });

module.exports = seedManagers;
