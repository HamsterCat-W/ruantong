const orderController = require("../controller/orderController");

const express = require("express");

const orderRoute = express.Router();

orderRoute
  .route("/order")
  .get(orderController.getOrders)
  .post(orderController.createOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

orderRoute.route("/ordlist").get(orderController.getOrderList);

module.exports = orderRoute;
