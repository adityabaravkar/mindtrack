const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../errors/apiError");

const roles = ["patient", "therapist"];

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  // passwordConfirm: {
  //   type: String,
  //   required: true,
  // },
  role: {
    type: String,
    default: "patient",
    enum: roles,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  phone: {
    type: String,
  },
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "firstName",
      "lastName",
      "email",
      "role",
      "address",
      "city",
      "country",
      "postalCode",
      "phone",
    ];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

userSchema.statics = {
  roles,

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
    if (!email) throw new APIError("Email must be provided for login");

    const user = await this.findOne({ email }).exec();
    if (!user)
      throw new APIError(
        `No user associated with ${email}`,
        httpStatus.NOT_FOUND
      );

    if (user.password !== password)
      throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED);

    return user;
  },
};

module.exports = mongoose.model("User", userSchema);
