const express = require("express");
const app = express();
const path = require("path");
// 数据库连接
require("./mongoConnect");

// 服务器端口
const port = 3344;
// 静态文件夹
// app.use(express.static(path.join(__dirname, "uploads")));
app.use("/static", express.static(path.join(__dirname, "public")));

const route = express.Router();
const userRoute = require("./routes/userRouter");
route.get("/123", (req, res) => {
  res.send("123");
});

app.use("/r", route);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
