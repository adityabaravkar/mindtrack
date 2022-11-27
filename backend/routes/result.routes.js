const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");

router.get("/getResults/:userId", resultController.getResults);

module.exports = router;
