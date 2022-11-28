const mongoose = require("mongoose");

const connectionsSchema = mongoose.Schema({
  Pid: {
    type: String,
  },
  Did: {
    type: String,
  },
  Pname: {
    type: String,
  },
  Dname: {
    type: String,
  },
  Score: {
    type: Number,
  },
});

module.exports = mongoose.model("Connections", connectionsSchema);
