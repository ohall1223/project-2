const { User } = require("../models");

const userData = [
  {
    email: "email",
    password: "password",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
