const mongoose = require("mongoose");

const connectionsSchema = mongoose.Schema({
    Pid: {
        type: String
    },
    Did: {
        type: String
    },
    Pname: {
        type: String
    },
    Dname: {
        type: String
    },
    Prescription: {
        type: String
    }
})

module.exports = mongoose.model("Connections", connectionsSchema);