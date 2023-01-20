const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//cloudinary reqirements
require("dotenv").config()
const cloudinary = require("cloudinary").v2
const fse = require("fs-extra")

//var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var passport = require("passport");
var SQLiteStore = require("connect-sqlite3")(session);

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use((req,res,next)=>{
  console.log(`${req.method} request recived on end point: ${req.url}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/", indexRouter);
app.use("/", authRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
app.use(passport.authenticate("session"));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});