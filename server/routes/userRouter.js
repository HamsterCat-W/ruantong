const userController = require("../controller/userController");
const express = require("express");

const userRoute = express.Router();

userRoute.route("/user").get().post(userController.createUser);

module.exports = userRoute;
