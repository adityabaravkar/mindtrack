const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const User = require("../models/user.model");

// User validation rules
module.exports = {
  signup: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      // passwordConfirm: Joi.string()
      //   .valid(Joi.ref("password"))
      //   .required()
      //   .strict(),
      userName: Joi.string().max(128).required(),
      role: Joi.string().valid(User.roles).required(),
    },
  },
  update: {
    body: {
      id: Joi.objectId().required(),
      email: Joi.string().email().required(),
      userName: Joi.string().max(128).required(),
    },
  },
};
