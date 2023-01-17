var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/", authRouter);

var session = require("express-session");
var passport = require("passport");

var SQLiteStore = require("connect-sqlite3")(session);

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