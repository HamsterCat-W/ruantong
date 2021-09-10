// app 配置
const express = require("express");
// 实例化express
const app = express();
const path = require("path");
// body解析
const bodyParser = require("body-parser");
// http 日志
const morgan = require("morgan");
// 数据库连接
require("./mongoConnect");
// 导入token.js
const vertoken = require("./utils/token/token");
// 验证token是否过期
const expressJwt = require("express-jwt");

// 静态文件夹
app.use("/static", express.static(path.join(__dirname, "public")));

// 解析http请求的body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 日志
app.use(morgan("combined"));

// 配置跨域
app.all("*", (req, res, next) => {
  // console.log(req);
  // 响应报头指示的请求的响应是否可以暴露于该页面
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // 运行跨域的地址
  // res.setHeader("Access-Control-Allow-Origin", req.get("Origin"));
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 允许跨域的方法
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,GET,PUT,OPTIONS,DELETE,PATCH"
  );

  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json;charset=utf-8");

  next();
});

const userRoute = require("./routes/userRouter");

// 验证token过期和白名单设置
app.use(
  expressJwt({
    secret: vertoken.jwtScrect,
    // 算法
    algorithms: ["HS256"],
  }).unless({
    path: ["/pv1/user/api/loginIn", "/pv1/user/api/signUp"],
  })
);

// 解析token获取用户信息
app.use(function (req, res, next) {
  let token = req.headers["authorization"];
  if (token == undefined) {
    next();
  } else {
    vertoken
      .getToken(token)
      .then((data) => {
        // 请求头存放token解析的数据
        req.data = data;
        next();
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }
});

// 路由引入
app.use("/pv1/user/api", userRoute);

// 错误处理
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ code: -1, msg: "用户验证失败,请登录后重试" });
  } else {
    console.log(err.message);
    res.status(500).send("出现了一个错误");
  }
});

module.exports = app;
