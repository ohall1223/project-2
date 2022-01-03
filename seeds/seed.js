const sequelize = require("../config/connection");
// may need to change const declaration of login-data.js
const seedUser = require("./login-data");
//same as above but for user-data.js
const { User } = require("../models");
const userData = require("./user-data");
const patientData = require("./patientData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const patient of patientData) {
    await Patient.create({
      ...patient,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
