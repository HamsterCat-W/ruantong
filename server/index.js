// // 入口文件
const app = require("./server");

// 服务器端口
const port = 3344;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
