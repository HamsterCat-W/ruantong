<template>
  <div class="poster">
    <el-form class="zhuce-container" label-position="left" label-width="0px">
      <h3 class="zhuce_title">注册账号</h3>
      <el-form-item>
        <el-input
          type="email"
          v-model="form.email"
          auto-complete="off"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form.phone"
          auto-complete="off"
          placeholder="电话"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-button type="primary" plain @click="onSubmit">注册</el-button>
          </el-col>
          <el-col :span="8" :push="3">
            <el-button type="primary" @click="login">登录</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      form: {
        email: "",
        password: "",
        phone: "",
      },
      responseResult: [],
    };
  },
  methods: {
    onSubmit() {
      // var _this = this
      // console.log(this.$store.state)
      this.$axiosInstance.setToken();
      this.$request
        .post("/pv1/user/api/user", {
          email: this.form.email,
          password: this.form.password,
          phone: this.form.phone,
        })
        .then((resp) => {
          if (resp && resp.status === 200) {
            this.$emit("onSubmit");
            this.$message({
              message: "注册成功请返回登录",
              type: "success",
            });
          }
        });
    },
    login() {
      this.$router.push("./");
    },
  },
};
</script>

<style>
.poster {
  background: url("../../assets/loginbackground.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

.zhuce-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 140px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.zhuce_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>