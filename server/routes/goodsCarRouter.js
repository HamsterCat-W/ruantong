const goodscarController = require("../controller/goodsCarController");

const express = require("express");

const goodsCarRoute = express.Router();

goodsCarRoute
  .route("/car")
  .get(goodscarController.getAllCarByUserId)
  .post(goodscarController.createCar)
  .patch(goodscarController.updateCar)
  .delete(goodscarController.deleteCar);

module.exports = goodsCarRoute;
