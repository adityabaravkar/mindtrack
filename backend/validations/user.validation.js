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
      firstName: Joi.string().max(128).required(),
      role: Joi.string().valid(User.roles).required(),
    },
  },
  update: {
    body: {
      id: Joi.objectId().required(),
      email: Joi.string().email().required(),
      firstName: Joi.string().max(128).required(),
      lastName: Joi.string().max(128),
      address: Joi.string().max(128),
      city: Joi.string().max(128),
      country: Joi.string().max(128),
      postalCode: Joi.number(),
      phone: Joi.string().max(128),
    },
  },
};
