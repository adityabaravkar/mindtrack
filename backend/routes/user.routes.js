var express = require("express");
var router = express.Router();
const validator = require("express-validation");
const { signup } = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

router.post("/signup", validator(signup), userController.signup);
router.post("/login", userController.login);

module.exports = router;
