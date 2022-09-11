const express = require("express");
const app = express();
const connectDB = require("./config/db");
var bodyParser = require('body-parser');

//instantiate all the models
require("./models/user");

//connect to database
connectDB();



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//Define all the routes
app.use(require("./routes/signup"));
app.use(require("./routes/login"));

const PORT = process.env.PORT || 9000;
//Client code will be running on port 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));