import axios from "axios";

// 加载进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// const token = "Bearer " + sessionStorage.getItem("token");

const request = axios.create({
  // 请求的初始路径
  // baseURL: "http://localhost:8888",
  baseURL: "http://47.101.54.223:3000",
  timeout: 5000,
  // headers: {
  //   Authorization: token,
  // },
});

// 存储token
let setToken = function() {
  request.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");
};

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    NProgress.start();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    NProgress.done();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    NProgress.done();
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    NProgress.done();
    return Promise.reject(error);
  }
);
export default { request, setToken };
