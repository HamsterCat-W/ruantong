const mongose = require("mongoose");
const userSchema = new mongose.Schema({
  // 用户ID
  userId: {
    type: String,
    default: mongose.Types.ObjectId,
  },
  //   邮箱
  email: String,
  //   密码
  password: String,
  //   电话
  phone: String,
  //   身份
  role: {
    type: String,
    enum: ["superAdmin", "admin", "customer"],
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
  console.log("Collection is created!");
});

module.exports = userModel;
