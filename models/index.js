const User = require("./User");
const Patient = require("./patient");
const Event = require("./event")

User.hasMany(Patient, {
    foreignKey: "user_id",
});

Patient.belongsTo(User, {
    foreignKey: "user_id",
})

Patient.hasMany(Event, {
    foreignKey: "patient_id",
});

Event.belongsTo(Patient, {
    foreignKey: "patient_id",
})



module.exports = { User, Patient, Event };
