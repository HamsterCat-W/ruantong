const orderController = require("../controller/orderController");

const express = require("express");

const orderRoute = express.Router();

orderRoute
  .route("/order")
  .get(orderController.getOrder)
  .post(orderController.createOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = orderRoute;
