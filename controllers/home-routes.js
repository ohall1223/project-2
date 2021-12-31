//home routes for all our gets!!!!!

const router = require("express").Router();

router.get("/", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("landing");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/journal");
    return;
  }

  res.render("landing");
});
module.exports = router;
