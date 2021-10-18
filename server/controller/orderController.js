const orderModel = require("../models/orderModel");

const createOrder = async (req, res) => {
  let data = await orderModel.create(req.body);
  if (data) {
    console.log("创建了一个订单");

    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: "订单创建成功",
      },
      data: data,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "订单创建失败",
      },
    });
  }
};

const deleteOrder = async (req, res) => {
  let { orderList } = req.body;

  let flag;
  for (let i = 0; i < orderList.length; i++) {
    let data = await orderModel.findOneAndDelete({
      orderId: orderList[i],
    });
    if (data !== null) {
      console.log("删除了一条数据");
      console.log(data);
      flag = 1;
    } else {
      console.log(`删除orderId: ${orderList[i]} 失败`);
      flag = 0;
    }
  }

  if (flag) {
    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: `删除成功,一共删除了${orderList.length}条数据`,
      },
      data: 1,
    });
  } else {
    res.send({
      meta: {
        status: "error",
        code: 500,
        msg: "删除失败,订单不存在",
      },
      data: 0,
    });
  }
};

const getOrderById = async (req, res) => {
  let { customerId } = req.query;
  // console.log(customerId);

  let data = await orderModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "userId",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "merchantId",
        foreignField: "userId",
        as: "merchant",
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
      $lookup: {
        from: "goodsCar",
        localField: "goodsCarId",
        foreignField: "goodsCarId",
        as: "goodsCar",
      },
    },

    {
      $match: { customerId: customerId },
    },

    {
      $project: {
        _id: 0,
        orderId: 1,
        sourcePlace: 1,
        destPlace: 1,
        totalPrice: 1,
        num: 1,
        customer: "$customer.email",
        merchant: "$merchant.email",
        goodsName: "$goods.goodsName",
        goodsimgSrc: "$goods.imgSrc",
        goodsdescription: "$goods.description",
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

const getOrderList = async (req, res) => {
  let data = await orderModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "userId",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "merchantId",
        foreignField: "userId",
        as: "merchant",
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
      $lookup: {
        from: "goodsCar",
        localField: "goodsCarId",
        foreignField: "goodsCarId",
        as: "goodsCar",
      },
    },

    {
      $project: {
        _id: 0,
        orderId: 1,
        sourcePlace: 1,
        destPlace: 1,
        totalPrice: 1,
        customer: "$customer.email",
        merchant: "$merchant.email",
        goodsName: "$goods.goodsName",
        goodsimgSrc: "$goods.imgSrc",
        goodsdescription: "$goods.description",
        goodsNum: "$goodsCar.num",
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

const updateOrder = async (req, res) => {
  let data = await orderModel.updateOne(
    { orderId: req.body.orderId },
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

module.exports = {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrderList,
  updateOrder,
};
