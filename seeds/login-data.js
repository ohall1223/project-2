const { User } = require("../models/Index");

const userData = [
  {
    email: "email",
    password: "password",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
