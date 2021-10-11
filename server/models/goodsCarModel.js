const mongose = require("mongoose");

const goodsCarSchema = new mongose.Schema({
  goodsCarId: {
    type: String,
    default: mongose.Types.ObjectId,
  },

  goodsId: {
    type: String,
    ref: "goods",
    required: true,
  },

  userId: {
    type: String,
    ref: "users",
    required: true,
  },

  totalPrice: {
    type: String,
    required: true,
  },
});

const goodsCarModel = mongose.model("goodsCar", goodsCarSchema);
goodsCarModel.createCollection().then(function (collection) {
  // console.log(collection);
  console.log("goodsCar Collection is created!");
});

module.exports = goodsCarModel;
