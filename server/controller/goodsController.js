const goodsModel = require("../models/goodsModel");

const createGoods = async (req, res) => {
  let data = await goodsModel.create(req.body);
  console.log(data);
  if (data) {
    console.log("创建了一个新的商品");

    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "商品创建成功",
      },
      data: data,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "商品创建失败",
      },
    });
  }
};

const findoneGoods = async (req, res) => {
  let data = await goodsModel.findOne(req.query);
  if (data) {
    console.log(`查询商品${req.body.goodsId}成功`);
    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "商品查询成功",
      },
      data: data,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "商品查询失败",
      },
    });
  }
};

const findAllGoods = async (req, res) => {
  let data = await goodsModel.find();
  if (data) {
    console.log("查询成功");
    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "查询成功",
      },
      data: data,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "查询失败",
      },
    });
  }
};

const updateGoods = async (req, res) => {};

const deleteGoods = async (req, res) => {};

module.exports = {
  createGoods,
  findoneGoods,
  findAllGoods,
  updateGoods,
  deleteGoods,
};
