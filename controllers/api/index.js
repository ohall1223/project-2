const router = require("express").Router();

const userRoutes = require("./user-routes");
const patientRoutes = require("./patient-routes");
const eventRoutes = require("./event-routes");

router.use("/users", userRoutes);

module.exports = router;
