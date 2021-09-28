const mongose = require("mongoose");

const goodSchema = new mongose.Schema({
  goodsId: {
    type: String,
    default: mongose.Types.ObjectId,
  },
  // 名字
  goodsName: {
    type: String,
    required: true,
  },
  //   价格
  price: {
    type: Number,
    required: true,
  },
  //   库存
  repertory: {
    type: Number,
    required: true,
  },
  //   图片
  imgSrc: String,
  //  类型
  species: {
    type: String,
    required: true,
  },
  //   描述
  description: Object,
});

const goodsModel = mongose.model("goods", goodSchema);

goodsModel.createCollection().then(function (collection) {
  // console.log(collection);
  console.log("goods Collection is created!");
});

module.exports = goodsModel;
