//home routes for all our gets!!!!!

const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }
  console.log(req.session)
  const loggedInUser = { userEmail: req.session?.user?.email || null , loggedIn: req.session?.loggedIn || false };

  res.render("landing", loggedInUser);
});

router.get("/journal", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  const loggedInUser = { userEmail: req.session.user.email, loggedIn:req.session.loggedIn  };
  res.render("journal", loggedInUser);
});

router.get("/form", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
    const loggedInUser = { userEmail: req.session.user.email, loggedIn:req.session.loggedIn  };

  res.render("form", loggedInUser);
});

router.get("/");
router.get("/static", (req, res) => {
  res.render("static");
});
module.exports = router;
