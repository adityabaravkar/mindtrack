const Connections = require("../models/connections.model");

exports.myDoctor = async (req, res, next) => {
    try {
        console.log("++++++++++++++ Calling myDoctor from Mongo    ++++++++++++++++++++");
        const doctor = await Connections.find({pid:req.id})
        res.status(httpStatus.OK);
        res.send(doctor);
        console.log("++++++++++++++ Ending myDoctor request    ++++++++++++++++++++");
    } catch (error) {
        next(error);
    }
};

exports.myPatients = async (req, res, next) => {
    try {
        console.log("++++++++++++++ Calling myPatients from Mongo    ++++++++++++++++++++");
        const doctors = await Connections.find({did:req.id})
        res.status(httpStatus.OK);
        res.send(doctors);
        console.log("++++++++++++++ Ending myPatients request    ++++++++++++++++++++");
    } catch (error) {
        next(error);
    }
};