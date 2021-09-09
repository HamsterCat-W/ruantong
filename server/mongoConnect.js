const mongoose = require("mongoose");
const conf = require("./config");
const userController = require("./controller/userController");

mongoose
  .connect(conf.mongodUrl)
  .then((res) => {
    // console.log(res);
    console.log("数据库连接成功");
    userController.initSuperAdmin();
  })
  .catch((err) => {
    console.log(err);
    console.log("数据库连接失败");
  });
