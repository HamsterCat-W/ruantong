const goodsController = require("../controller/goodsController");

const express = require("express");

const goodsRoute = express.Router();

goodsRoute
  .route("/goods")
  .get(goodsController.findoneGoods)
  .post(goodsController.createGoods)
  .patch(goodsController.updateGoods);

goodsRoute
  .route("/goodslist")
  .get(goodsController.findAllGoods)
  .delete(goodsController.deleteGoods);

module.exports = goodsRoute;
