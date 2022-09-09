const mongoose = require("mongoose");
const httpStatus = require("http-status");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "userName", "email"];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

userSchema.statics = {
  checkDuplicateEmailError(err) {
    if (err.code === 11000) {
      var error = new Error("Email already taken");
      error.errors = [
        {
          field: "email",
          location: "body",
          messages: ["Email already taken"],
        },
      ];
      error.status = httpStatus.CONFLICT;
      return error;
    }

    return err;
  },
};

module.exports = mongoose.model("User", userSchema);
