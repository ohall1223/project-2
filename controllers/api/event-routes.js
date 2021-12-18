const router = require("express").Router();
const { Patient, User, Event } = require("../../models");



// CREATE new event -POST

// Major Work in Progress!, issue is only assigning the event to the selected patient on the signed in user.
router.post("/", async (req, res) => {
  try {
      const dbEventData = await Event.create({
          temperature: req.body.temperature || null,
          temperatureTime: req.body.temperatureTime || null,
          medication: req.body.medication || null,
          medicationTime: req.body.medicationTime || null,
          medicationDosage: req.body.medicationDosage || null,
          patient_id: req.session.user.patient.id
    });
    console.log(dbEventData);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// View one event -GET


// View all patient events -GET


// Update event -PUT


// Delete event -DELETE




module.exports = router;