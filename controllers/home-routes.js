//home routes for all our gets!!!!!

const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }
  const loggedInUser = { userEmail: req.session?.user?.email || null };

  res.render("landing", loggedInUser);
});

router.get("/journal", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  const loggedInUser = { userEmail: req.session.user.email };
  res.render("journal", loggedInUser);
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