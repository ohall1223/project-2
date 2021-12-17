const sequelize = require("../config/connection");
// may need to change const declaration of login-data.js
// const seedUser = require("./login-data");
//same as above but for user-data.js
const seedPatients = require("./user-data");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedPatients();
  process.exit(0);
};

seedAll();
