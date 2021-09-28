const mongose = require("mongoose");

const goodsCarSchema = new mongose.Schema({
  goodsCarId: {
    type: String,
    default: mongose.Types.ObjectId,
  },

  num: {
    type: Number,
    default: 1,
    required: true,
  },

  goodsId: {
    type: mongose.Schema.Types.ObjectId,
    ref: "goods",
    required: true,
  },

  userId: {
    type: mongose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const goodsCarModel = mongose.model("goodsCar", goodsCarSchema);
goodsCarModel.createCollection().then(function (collection) {
  // console.log(collection);
  console.log("goodsCar Collection is created!");
});

module.exports = goodsCarModel;
