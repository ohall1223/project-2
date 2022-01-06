const router = require("express").Router();
const { Patient, User, Event } = require("../../models");

// CREATE new event -POST
// Using body "patient_id" to determine foriegn key affiliation
// TODO: Limit to signed in user.
router.post("/", async (req, res) => {
  try {
    const dbEventData = await Event.create({
      temperature: req.body.temperature || null,
      temperatureTime: req.body.temperatureTime || null,
      medication: req.body.medication || null,
      medicationTime: req.body.medicationTime || null,
      currentSymptoms: req.body.currentSymptoms || null,
      additionalInfo: req.body.additionalInfo,
      eventDate: req.body.eventDate,
      patient_id: req.body.patient_id,
    });
    console.log(dbEventData);
    res.status(200).json(dbEventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  console.log(req.body);
});

// View one event -GET
// Uses body "event_id"
// TODO: Limit to signed in user.
router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const dbEventData = await Event.findOne({
        where: {
          id: req.body.event_id,
        },
      });

      console.log(dbEventData);
      res.json(dbEventData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(404).end();
  }
});

// View all patient events -GET
// Uses body "patient_id"
// TODO: Limit to signed in user.
router.get("/group/", async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const dbEventData = await Event.findAll({});

      console.log(dbEventData);
      res.json(dbEventData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(404).end();
  }
});

// All events by date -GET
// Uses body "eventDate"
// TODO: Limit to signed in user.
router.get("/date/", async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const dbEventData = await Event.findAll({
        where: {
          eventDate: req.body.eventDate,
        },
      });

      console.log(dbEventData);
      res.json(dbEventData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).end();
  }
});
// TO MAKE: Same as above but localized to one patient

// Update event -PUT
// TODO: Limit to signed in user.
router.put("/", async (req, res) => {
  if (req.session.loggedIn) {
    Event.update(
      {
        temperature: req.body.temperature || null,
        temperatureTime: req.body.temperatureTime || null,
        medication: req.body.medication || null,
        medicationTime: req.body.medicationTime || null,
        currentSymptoms: req.body.currentSymptoms || null,
        eventDate: req.body.eventDate,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((updatedEvent) => {
        res.json(updatedEvent);
      })
      .catch((err) => res.json(err));
  } else {
    res.status(403).end();
  }
});

// Delete event by id -DELETE
// TODO: Limit to signed in user.
router.delete("/:id", async (req, res) => {
  if (req.session.loggedIn) {
    Event.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedEvent) => {
        res.json(deletedEvent);
      })
      .catch((err) => res.json(err));
  } else {
    res.status(404).end();
  }
});

// Delete all events for patient -DELETE
// TODO: Limit to signed in user.
router.delete("/delete_all/:patient_id", async (req, res) => {
  if (req.session.loggedIn) {
    Event.destroy({
      where: {
        patient_id: req.params.patient_id,
      },
    })
      .then((deletedEvent) => {
        res.json(deletedEvent);
      })
      .catch((err) => res.json(err));
  } else {
    res.status(403).end();
  }
});

module.exports = router;
