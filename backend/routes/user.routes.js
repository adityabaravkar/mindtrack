var express = require("express");
var router = express.Router();
const validator = require("express-validation");
const { signup, update } = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

router.post("/signup", validator(signup), userController.signup);
router.post("/login", userController.login);
router.post("/update", validator(update), userController.update);

module.exports = router;
