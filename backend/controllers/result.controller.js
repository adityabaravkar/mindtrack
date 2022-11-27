const httpStatus = require("http-status");
const Result = require("../models/result.model");

exports.getResults = async (req, res, next) => {
  try {
    const results = await Result.find({ userId: req.params.userId })
      .sort({
        dt: -1,
      })
      .exec();
    res.status(httpStatus.OK);
    res.send(results);
  } catch (error) {
    next(error);
  }
};
