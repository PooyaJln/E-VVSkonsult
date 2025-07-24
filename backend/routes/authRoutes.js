var express = require('express');
var passport = require('passport');
const authControllers = require("../controllers/authController");
const validationsMiddleware = require("../middlewares/validationsMiddleware")
const router = express.Router();

router.post("/signup", validationsMiddleware.signUp, authControllers.signUp);

router.post("/login", validationsMiddleware.login, passport.authenticate("local"), authControllers.login);

router.post("/logout", authControllers.logout);

router.get("/status", passport.authenticate("local"), authControllers.checkStatus);

module.exports = router;

