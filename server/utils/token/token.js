const jwt = require("jsonwebtoken");

// token 密钥
const jwtScrect = "URmfsaGAsLccrKQmpofgW3k0WtamYLi5";

// 设置token
const setToken = function (userId, email, role) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      { userId: userId, email: email, role: role },
      jwtScrect,
      { expiresIn: "24h" }
    );
    resolve(token);
  });
};

// 获取token信息
const getToken = function (token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      console.log("token是空的");
      reject({
        error: "token is empty",
      });
    } else {
      let info = jwt.verify(token.split(" ")[1], jwtScrect);
      resolve(info);
    }
  });
};

module.exports = {
  jwtScrect,
  setToken,
  getToken,
};
