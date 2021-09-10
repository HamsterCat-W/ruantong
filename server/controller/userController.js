// 用户层controller
// 用户模型
const userModel = require("../models/userModel");
// token
const vertoken = require("../utils/token/token");
// 加密算法
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
  // console.log(req.data);

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
      let result = await userModel.create(req.body);
      if (result) {
        console.log("-----------------创建了一个新用户");
        // console.log(result);
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
    await userModel.create(doc).catch((err) => {
      console.log(err);
    });
  } else {
    console.log(data);
  }
};

// 获取一个用户
const getUser = async (req, res) => {
  let { email } = req.query;

  if (email == "" || email.trim() == "") {
    res.send({
      meta: {
        status: "error",
        code: 400,
        msg: "邮箱不能为空",
      },
    });
  } else {
    // 查询
    let data = await userModel.findOne({ email: email });
    console.log(`查询了邮箱为：${email}的用户信息`);
    console.log(data);
    if (data) {
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
          status: "fail",
          code: 500,
          msg: "该用户不存在",
        },
      });
    }
  }
};

// 获取所有用户
const getAllUser = async (req, res) => {
  let data = await userModel.find();
  console.log("查询了所有的用户-------->");
  res.send({
    meta: {
      status: "success",
      code: 200,
      msg: "查询成功",
    },
    data: data,
  });
};

// 修改用户信息
const updateUserInfo = async (req, res) => {
  let data = await userModel.updateOne(
    { email: req.body.email },
    { ...req.body }
  );
  // console.log(data);
  if (data.modifiedCount == 1) {
    console.log(`修改了用户${req.body.email}的信息----`);

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
        status: "fail",
        code: 500,
        msg: "修改失败",
      },
      data: 0,
    });
  }
};

// 删除用户
const deleteOneUser = async (req, res) => {
  let data = await userModel.findOneAndDelete({ email: req.body.email });
  if (data) {
    console.log(`删除了${req.body.email}----->:`);
    console.log(data);
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
        status: "fail",
        code: 500,
        msg: "删除失败",
      },
      data: 0,
    });
  }
};

// 删除多个用户
const deleteManyUser = (req, res) => {
  let { deleteList } = req.body;
  try {
    deleteList.forEach(async (element) => {
      // element.email
      let data = await userModel.findOneAndDelete({ email: element.email });
      if (!data) {
        throw `删除${element.email}时出现错误`;
      } else {
        console.log(`删除了${req.body.email}----->:`);
        console.log(data);
      }
    });

    res.send({
      meta: {
        status: "success",
        code: 200,
        msg: `一共删除了${deleteList.length}条数据`,
      },
      data: 1,
    });
  } catch (error) {
    console.log(error);
    res.send({
      meta: {
        status: "fail",
        code: 500,
        msg: error,
      },
      data: 0,
    });
  }
};

// 登录
const signIn = async (req, res) => {
  let { email, password } = req.body;
  let result = await userModel.findOne({ email: email });
  if (result) {
    if (result.password === password) {
      console.log(`--------用户 ${email}登录了--------`);
      let token = await vertoken.setToken(
        result.userId,
        result.email,
        result.role
      );
      res.send({
        meta: {
          status: "success",
          code: 200,
          msg: "登录成功",
        },
        data: result,
        token: token,
      });
    } else {
      res.send({
        meta: {
          status: "fail",
          code: 400,
          msg: "密码错误",
        },
      });
    }
  } else {
    res.send({
      meta: {
        status: "fail",
        code: 500,
        msg: "用户不存在",
      },
    });
  }
};

module.exports = {
  createUser,
  initSuperAdmin,
  getUser,
  getAllUser,
  updateUserInfo,
  deleteOneUser,
  deleteManyUser,
  signIn,
};
