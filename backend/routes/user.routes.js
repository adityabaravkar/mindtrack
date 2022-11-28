const express = require("express");
const router = express.Router();
const validator = require("express-validation");
const { signup, update } = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/authorization");
const connectionsController = require("../controllers/connections.controller");

router.post("/signup", validator(signup), userController.signup);
router.post("/login", userController.login);
router.post("/update", auth(), validator(update), userController.update);
router.get("/detail/:userId", userController.detail);
router.get("/getDoctors", userController.getDoctors);
router.get("/myDoctor", connectionsController.myDoctor);
router.get("/myPatients", connectionsController.myPatients);
router.post("/connect", connectionsController.connect);

module.exports = router;
