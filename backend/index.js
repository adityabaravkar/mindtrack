const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error-handler");
const mongoose = require("./services/mongoose");
const passport = require("passport");
const passportJwt = require("./services/passport");

//connect to database
mongoose.connect();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// passport
app.use(passport.initialize());
passport.use("jwt", passportJwt.jwt);

//Define all the routes
app.use(require("./routes/user.routes"));
app.use(require("./routes/result.routes"));
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

const PORT = process.env.PORT || 9000;
//Client code will be running on port 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
