var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var blog = require("./models/blog");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var mongoose = require("mongoose");
var passport = require("passport");
mongoose.connect(
  process.env.blogpost,
  { useNewUrlParser: true }
);

require("./models/user");
require("./config/passport");
require("./models/Comment");
require("./models/blog");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var blogRouter = require("./routes/blog");
var detailRouter = require("./routes/detail");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyBoard",
    resave: false,
    saveUninitialized: true,
    name: "cookies",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    // cookies: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  req.session.name = "check";
  next();
});
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/blog", blogRouter);
app.use("/users", usersRouter);
app.use("/detail", detailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
