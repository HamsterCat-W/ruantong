// 用户路由
const userController = require("../controller/userController");
const express = require("express");
const { updateOne } = require("../models/userModel");

const userRoute = express.Router();

// 根据邮箱查找、删除一个用户
userRoute
  .route("/user")
  .get(userController.getUser)
  .post(userController.createUser)
  .put(userController.updateUserInfo)
  .delete(userController.deleteOneUser);

//   根据传入的数据数组进行多个用户的查询和删除
userRoute
  .route("/userlist")
  .get(userController.getAllUser)
  .delete(userController.deleteManyUser);

//   登录
userRoute.route("/loginIn").post(userController.signIn);
// 注册
userRoute.route("/signUp").post(userController.createUser);
module.exports = userRoute;
