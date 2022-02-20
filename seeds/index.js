const seedEmployees = require("./employee-seeds");
const seedManagers = require("./manager-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedEmployees();
  await seedManagers();

  process.exit(0);
};

seedAll();
