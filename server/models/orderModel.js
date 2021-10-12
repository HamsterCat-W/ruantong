const mongose = require("mongoose");

const orderSchema = new mongose.Schema({
  orderId: {
    type: String,
    default: mongose.Types.ObjectId,
  },
  sourcePlace: {
    type: String,
    required: true,
  },
  destPlace: {
    type: String,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  customerId: {
    type: String,
    ref: "users",
    required: true,
  },

  merchantId: {
    type: String,
    ref: "users",
    required: true,
  },

  goodsId: {
    type: String,
    ref: "goods",
    required: true,
  },

  goodsCarId: {
    type: String,
    ref: "goodsCar",
    required: true,
  },
});

const orderModel = mongose.model("order", orderSchema);
orderModel.createCollection().then(function (collection) {
  // console.log(collection);
  console.log("order Collection is created!");
});

module.exports = orderModel;
