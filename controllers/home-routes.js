//home routes for all our gets!!!!!

const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("landing");
});

// router.get("/journal", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findAll(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("journal", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/journal", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("journal");
});

router.get("/form", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("form");
});

router.get("/");
router.get("/static", (req, res) => {
  res.render("static");
});
module.exports = router;