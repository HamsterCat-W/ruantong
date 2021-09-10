// 用户层controller
const userModel = require("../models/userModel");
const crypto = require("crypto");

// md5函数书写
function md5(s) {
  return crypto.createHash("md5").update(String(s)).digest("hex");
}

// 密码加密的方式
function savePassword(s) {
  let pass0 = md5(s);
  return md5(pass0.split().reverse().join());
}

// 创建用户
const createUser = async (req, res) => {
  let { email, password } = req.body;
  if (
    email == null ||
    email.trim() === "" ||
    password == null ||
    password.trim() == null
  ) {
    res.send({
      meta: {
        status: "error",
        code: 400,
        msg: "邮箱或密码不能为空",
      },
    });
  } else {
    let data = await userModel.findOne({ email: email });
    console.log(data);
    if (data) {
      res.send({
        meta: {
          status: "fail",
          code: 500,
          msg: "您的账户已经注册过啦",
        },
      });
    } else {
      console.log("*******");
      let result = await userModel.create(req.body);
      if (result) {
        console.log("-----------------创建了一个新用户");
        console.log(result);

        res.send({
          meta: {
            status: "success",
            code: 200,
            msg: "用户创建成功",
          },
          data: result,
        });
      } else {
        res.send({
          meta: {
            status: "fail",
            code: 500,
            msg: "用户创建失败",
          },
        });
      }
    }
  }
};

// 初始化超级管理员
const initSuperAdmin = async (req, res) => {
  //   console.log("111");
  const doc = {
    //   邮箱
    email: "superAdmin@snnu.edu.cn",
    //   密码
    password: savePassword("admin"),
    //   电话
    phone: "13333333333",
    //   身份
    role: "superAdmin",
  };

  let data = await userModel.find({ email: doc.email });
  if (data.length == 0) {
    let superAdmin = await userModel.create(doc).catch((err) => {
      console.log(err);
    });
  } else {
    console.log(data);
  }
};

// 获取一个用户
const getUser = async (req, res) => {
  let { email } = req.query;
  let data = await userModel.findOne({ email: email });
  console.log(data);
};

// 获取所有用户
const getAllUser = async (req, res) => {};

// 修改用户信息
const updateUserInfo = async (req, res) => {};

// 删除用户
const deleteOneUser = async (req, res) => {};

// 删除多个用户
const deleteManyUser = async (req, res) => {};

// 登录
const signIn = async (req, res) => {};

// 注册
const signUp = async (req, res) => {};

module.exports = {
  createUser,
  initSuperAdmin,
  getUser,
  getAllUser,
  updateUserInfo,
  deleteOneUser,
  deleteManyUser,
  signIn,
  signUp,
};
