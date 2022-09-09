const httpStatus = require("http-status");
const User = require("../models/user.model");

exports.signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.send(savedUser.transform());
  } catch (error) {
    return next(User.checkDuplicateEmailError(error));
  }
};
