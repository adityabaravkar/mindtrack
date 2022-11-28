const Connections = require("../models/connections.model");
const httpStatus = require("http-status");

exports.myDoctor = async (req, res, next) => {
  try {
    console.log(
      "++++++++++++++ Calling myDoctor from Mongo    ++++++++++++++++++++"
    );
    const doctor = await Connections.find({ pid: req.id });
    res.status(httpStatus.OK);
    res.send(doctor);
    console.log(
      "++++++++++++++ Ending myDoctor request    ++++++++++++++++++++"
    );
  } catch (error) {
    next(error);
  }
};

exports.myPatients = async (req, res, next) => {
  try {
    console.log(
      "++++++++++++++ Calling myPatients from Mongo    ++++++++++++++++++++"
    );
    console.log(req.query);
    const doctors = await Connections.find({ Did: req.query.id });
    res.status(httpStatus.OK);
    res.send(doctors);
    console.log(
      "++++++++++++++ Ending myPatients request    ++++++++++++++++++++"
    );
  } catch (error) {
    next(error);
  }
};

exports.connect = async (req, res, next) => {
    try {
        console.log("++++++++++++++ Connecting Doctor to patient    ++++++++++++++++++++");
        console.log("Request:" + JSON.stringify(req.body));
        let connection = {
            Did: req.body.did,
            Pid: req.body.pid,
            Dname: req.body.dname,
            Pname: req.body.pname,
        }
        await Connections.create(connection, (err, conn) => {
            if (err) {
                res.status(httpStatus.BAD_REQUEST);
                res.send("Invalid Request");
                console.log("++++++++++++++ Ending myPatients request  with Error  ++++++++++++++++++++");
            } else {
                res.status(httpStatus.OK);
                res.send(conn);
                console.log("++++++++++++++ Ending myPatients request with Success  ++++++++++++++++++++");
            }
        })
    } catch (error) {
        next(error);
    }
};