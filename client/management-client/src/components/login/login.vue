<template>
  <div class="login-body">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="login-form"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input
          type="text"
          v-model="loginForm.email"
          autocomplete="on"
          placeholder="请输入邮箱"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          size="small"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8"
            ><el-button type="primary" @click="signIn('loginForm')"
              >登录</el-button
            ></el-col
          >
          <el-col :span="8"
            ><el-button @click="signUp('loginForm')">注册</el-button></el-col
          >
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    signIn(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          let res = await this.$request.post("/login", {
            email: this.loginForm.email,
            password: this.loginForm.password,
          });
          // console.log(res);
          let { msg, token } = res.data.meta;

          if (msg === "success") {
            sessionStorage.setItem("token", token);
            this.$axiosInstance.setToken();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    signUp(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-body {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: url("../../assets/loginbackground.jpg") no-repeat;
  background-size: 100%;
  z-index: -1;
}
.login-form {
  width: 350px;
  margin: auto; /* 上下间距220px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.7); /* 透明背景色 */
  /* padding: 30px; */
  padding: 50px 60px 35px 10px;
  border-radius: 20px; /* 圆角 */
  position: relative;
  top: 30%;
}
</style>>