<template>
  <div class="index-container">
    <div class="header">
      <div class="logo">logo</div>
      <div class="goods-car">购物车</div>
    </div>
    <router-view></router-view>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
</style>