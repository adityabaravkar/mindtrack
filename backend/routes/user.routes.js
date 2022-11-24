const express = require("express");
const router = express.Router();
const validator = require("express-validation");
const { signup, update } = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/authorization");

router.post("/signup", validator(signup), userController.signup);
router.post("/login", userController.login);
router.post("/update", auth(), validator(update), userController.update);
router.get("/detail/:userId", auth(), userController.detail);

module.exports = router;
