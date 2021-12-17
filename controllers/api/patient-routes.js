const router = require("express").Router();
const { Patient, User } = require("../../models");


// CREATE new patient -POST  
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
    if (req.session.loggedIn) {
        try {
            const dbUserData = await User.findByPk(req.params.user_id, { include: [{ model: Patient }], });
       
            console.log(dbUserData);
            res.json(dbUserData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
    res.status(404).end();
  }

});

// Pull up individual patient info -GET
router.get('/:id', async (req, res) => 
{
    if (req.session.loggedIn) {
        try {
            const dbPatientData = await Patient.findByPk(req.params.id);
            //    console.log(dbPatientData);
            res.json(dbPatientData);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
    res.status(404).end();
  }
});

// Update individual Patient info -PUT
router.put('/:id', (req, res) => {
    if (req.session.loggedIn) {
        Patient.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                height: req.body.height || null,
                weight: req.body.weight,
                currentMeds: req.body.currentMeds || null,
                primaryPhysician: req.body.primaryPhysician || null,
                pharmacy: req.body.pharmacy || null,
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        )
            .then((updatedPatient) => {
                // Sends the updated book as a json response
                res.json(updatedPatient);
            })
            .catch((err) => res.json(err));
    } else {
    res.status(404).end();
  }
});
// Delete Patient and corresponding Events DELETE
router.delete('/:id', (req, res) => {
    if (req.session.loggedIn) {
        Patient.destroy({
            where: {
                id: req.params.id,
            }
        })
            .then((deletedBook) => {
                res.json(deletedBook);
            })
            .catch((err) => res.json(err));
    } else {
        res.status(404).end();
    }

});



module.exports = router;