const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  dt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Result", resultSchema);
