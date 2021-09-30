const goodsCarModel = require("../models/goodsCarModel");

const createCar = async (req, res) => {
  let data = await goodsCarModel.create(req.body);
  if (data) {
    console.log("创建了一个购物车");

    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "购物车创建成功",
      },
      data: data,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "购物车创建失败",
      },
    });
  }
};

const getAllCarByUserId = async (req, res) => {
  let data = await goodsCarModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "goods",
        localField: "goodsId",
        foreignField: "goodsId",
        as: "goods",
      },
    },
    {
      $match: { userId: req.query.userId },
    },
  ]);

  if (data) {
    console.log("查询所有订单");
    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "查找成功",
      },
      data: data,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "查找失败",
      },
    });
  }
};

const findAllCar = async (req, res) => {
  let data = await goodsCarModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "goods",
        localField: "goodsId",
        foreignField: "goodsId",
        as: "goods",
      },
    },
  ]);

  if (data) {
    console.log("查询所有订单");
    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "查找成功",
      },
      data: data,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "查找失败",
      },
    });
  }
};

const updateCar = async (req, res) => {
  let data = await goodsCarModel.updateOne(
    { goodsCarId: req.body.goodsCarId },
    req.body
  );

  if (data.modifiedCount == 1) {
    console.log("修改成功");
    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "修改成功",
      },
      data: 1,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "修改失败",
      },
      data: 0,
    });
  }
};

const deleteCar = async (req, res) => {
  let { goodsCarList } = req.body;

  goodsCarList.forEach(async (item) => {
    let data = await goodsCarModel.findOneAndDelete({ goodsCarId: item });
    console.log("删除了一条数据");
    console.log(data);
    if (data !== null) {
      res.send({
        meta: {
          status: "success",
          code: 200,
          msg: "删除成功",
        },
        data: 1,
      });
    } else {
      res.send({
        meta: {
          status: "error",
          code: 500,
          msg: "删除失败,购物车不存在",
        },
        data: 0,
      });
    }
  });
};

module.exports = {
  createCar,
  getAllCarByUserId,
  updateCar,
  deleteCar,
  findAllCar,
};
