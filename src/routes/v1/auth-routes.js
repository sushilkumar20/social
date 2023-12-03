const express = require("express");
const {authController} = require("../../controllers")
const {authMiddleware} = require("../../middleware");


const router = express.Router();

router.post("/login",authMiddleware.validateAuthRequest,authController.loginController);

router.post("/logout", authController.logoutController);

router.post("/register", authController.registerController);

module.exports = router;