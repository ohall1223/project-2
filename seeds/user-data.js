const { Patient } = require("../models");

const patientdata = [
  {
    firstName: "firstName",
    lastName: "lastName",
    height: "height",
    weight: "weight",
    CurrentMeds: [
      { med1: "med1" },
      { med2: "med2" },
      { med3: "med3" },
      { med4: "med4" },
    ],
    primaryPhysician: "primaryPhysician",
    pharmacy: "pharmacy",
  },
];

const seedPatients = () => Patient.create(patientdata);
