const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: "Super secret secret",
//   resave: false,
//   saveUninitialized: false,
// };

// //May need to be adjusted!!------------
const sess = {
  secret: "Super secret secret",
  cookie: {
    // Stored in milliseconds (86400 === 1 day)
    maxAge: 86400,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//---------------------------
app.use(session(sess));

const hbs = exphbs.create({});
// hbs.handlebars.registerHelper("fetchPatients", function () {
//   const data = fetch("/api/patient/group").then((res) => res.json());
//   console.log(data);
// });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("images"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
