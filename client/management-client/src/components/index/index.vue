<template>
  <div class="index-container">
    <div class="header">
      <div class="logo">
        <img src="../../assets/logo.jpg" alt="" srcset="" class="logo-img" />
      </div>

      <img :src="headImg" alt="" srcset="" class="user" @click="choose" />
    </div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">主页</el-menu-item>
      <el-menu-item index="2">消息中心</el-menu-item>
      <el-menu-item index="3">我的购物车</el-menu-item>
      <el-menu-item index="4">我的订单</el-menu-item>
    </el-menu>

    <div class="content">
      <router-view></router-view>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headImg: sessionStorage.getItem("headImg"),
    };
  },
  methods: {
    handleSelect(key) {
      // console.log(key);
      switch (key) {
        case "1":
          this._to({ name: "Index" });
          break;
        case "2":
          this._to({ name: "Message" });
          break;
        case "3":
          this._to({ name: "GoodsCar" });
          break;
        case "4":
          this._to({ name: "Order" });
        default:
          break;
      }
    },

    _to(obj) {
      if (this.$route.name !== obj.name) {
        this.$router.push({ name: obj.name });
      }
    },

    choose() {},
  },
};
</script>

<style scoped>
.index-container {
  width: 80%;
  height: 800px;
  margin: 0 auto;
  background-color: #f8f8ff;
}

.header {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  /* background-color: aqua; */
}

.logo {
  margin-left: 20px;
}

.goods-car {
  margin-right: 20px;
}

.content {
  margin-top: 20px;
}

.logo-img {
  width: 120px;
  height: 60px;
}

.user {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>