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

  async findAndValidate(payload) {
    const { email, password } = payload;
    if (!email) throw new Error("Email must be provided for login");

    const user = await this.findOne({ email }).exec();
    if (!user)
      throw new Error(`No user associated with ${email}`, httpStatus.NOT_FOUND);

    if (user.password !== password)
      throw new Error(`Password mismatch`, httpStatus.UNAUTHORIZED);

    return user;
  },
};

module.exports = mongoose.model("User", userSchema);
