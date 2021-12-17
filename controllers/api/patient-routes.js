const router = require("express").Router();
const { Patient, User } = require("../../models");


// CREATE new patient -POST  UPDATE ROUTE ADDRESS
router.post("/", async (req, res) => {
  try {
    const dbPatientData = await Patient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        height: req.body.height || null,
        weight: req.body.weight,
        currentMeds: req.body.currentMeds || null,
        primaryPhysician: req.body.primaryPhysician || null,
        pharmacy: req.body.pharmacy || null,
        user_id: req.session.user.id
    });
      console.log(dbPatientData);
      res.json(dbPatientData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Pull up list of Patients for User -GET
router.get('/group/:user_id', async (req, res) => {
  try {
      const dbUserData = await User.findByPk(req.params.user_id, {include: [{ model: Patient }], });
       
       console.log(dbUserData);
    res.json(dbUserData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Pull up individual patient info -GET
router.get('/:id', async (req, res) => 
{
    console.log("here it is", req.session);
  try {
      const dbPatientData = await Patient.findByPk(req.params.id);
    //    console.log(dbPatientData);
      res.json(dbPatientData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update individual Patient info -PUT

// Delete Patient and corresponding Events DELETE
module.exports = router;