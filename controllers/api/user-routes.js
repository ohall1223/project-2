//Page needs further Review-------------------------
const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

//---------------------------------------------------

//CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(dbUserData);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);
    console.log({ validPassword });

    if (!validPassword) {
      res.status(400).json({ message: "Password is incorrect" });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = dbUserData;
      console.log(
        "~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie",
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
