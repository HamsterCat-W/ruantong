const mongose = require("mongoose");
const userSchema = new mongose.Schema({
  // 用户ID
  userId: {
    type: String,
    default: mongose.Types.ObjectId,
  },
  //   邮箱
  email: {
    type: String,
    required: true,
  },
  //   密码
  password: {
    type: String,
    required: true,
  },
  //   电话
  phone: {
    type: String,
    required: true,
  },
  //   身份
  role: {
    type: String,
    enum: ["superAdmin", "admin", "customer", "vip"],
    default: "customer",
  },
  //   头像
  headPic: {
    type: String,
    default: "http://47.101.54.223:3344/static/images/head.png",
  },
});

// 中间件
// save之前触发
userSchema.pre("save", async function (next) {
  console.log("pre save");
  next();
});

userSchema.post("save", function (doc) {
  // doc是当前插入的文档
  console.log(doc);
});

const userModel = mongose.model("users", userSchema);

// 创建数据表
userModel.createCollection().then(function (collection) {
  // console.log(collection);
  console.log(" user Collection is created!");
});

module.exports = userModel;
