const router = require("express").Router();
const { Patient, User } = require("../../models");


// CREATE new patient -POST  
router.post("/", async (req, res) => {
    if (req.session.loggedIn) {
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
    } else {
    res.status(403).end();
  }
});


// Pull up list of Patients for User -GET
// TODO includes user not just patients, FIX?:
router.get('/group/', async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const dbUserData = await User.findByPk(req.session.user.id, { include: [{ model: Patient }], });
       
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
    if (req.session.loggedIn)  {
        try {
            const dbPatientData = await Patient.findByPk(req.params.id);
            if (dbPatientData.user_id === req.session.user.id) {
                //    console.log(dbPatientData);
                res.json(dbPatientData);
            } else {
                res.status(403).end();
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
    res.status(404).end();
  }
});

// Update individual Patient info -PUT
router.put('/:id', async (req, res) => {
    if (req.session.loggedIn) {
        const dbPatientData  = await Patient.findByPk(req.params.id);
        if (dbPatientData.user_id ===req.session.user.id) {
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
                res.json(updatedPatient);
            })
                .catch((err) => res.json(err));
            
            
            }else {
    res.status(403).end();
  }
    } else {
    res.status(403).end();
  }
});
// Delete Patient: 
// TODO: ADD corresponding Events DELETE!!!!!
router.delete('/:id', async (req, res) => {
    if (req.session.loggedIn) {
        const dbPatientData  = await Patient.findByPk(req.params.id);
        if (dbPatientData.user_id === req.session.user.id) {

            Patient.destroy({
                where: {
                    id: req.params.id,
                }
            })
                .then((deletedPatient) => {
                    res.json(deletedPatient);
                })
                .catch((err) => res.json(err));
        } else {
            res.status(403).end();
        }
    } else {
        res.status(404).end();
    }

});

// Delete all patients for user -DELETE
// TODO: Limit to signed in user.
router.delete('/delete_all/:patient_id', async (req, res) => {
    if (req.session.loggedIn) {
            Patient.destroy({
                where: {
                    user_id: req.session.user.id,
                }
            })
                .then((deletedPatient) => {
                    res.json(deletedPatient);
                })
                .catch((err) => res.json(err));
    } else {
        res.status(403).end();
    }

});

module.exports = router;