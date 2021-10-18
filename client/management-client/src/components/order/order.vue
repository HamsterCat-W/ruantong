<template>
  <div class="order-container" align="center">
    <div class="order" v-for="(item, index) in orderList" :key="index">
      <el-descriptions
        :title="'订单' + (index + 1)"
        direction="vertical"
        :column="4"
        border
      >
        <el-descriptions-item label="用户邮箱">{{
          item.customer[0]
        }}</el-descriptions-item>
        <el-descriptions-item label="总价"
          >{{ item.totalPrice }} 元</el-descriptions-item
        >
        <el-descriptions-item label="商家邮箱">{{
          item.merchant[0]
        }}</el-descriptions-item>
        <el-descriptions-item label="商品名称">{{
          item.goodsName[0]
        }}</el-descriptions-item>
        <el-descriptions-item label="商品数量">{{
          item.num
        }}</el-descriptions-item>
        <el-descriptions-item label="出发地" :span="2">{{
          item.sourcePlace
        }}</el-descriptions-item>
        <el-descriptions-item label="目的地址">{{
          item.destPlace
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "",
      orderList: [],
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      this.$axiosInstance.setToken();
      let res = await this.$request.get("/pv1/order/api/order", {
        params: {
          customerId: sessionStorage.getItem("userId"),
        },
      });

      console.log(res.data.data);
      this.orderList = res.data.data;
    },
  },
};
</script>

<style scoped>
.order-container {
  width: 100%;
}

.order {
  width: 80%;
  margin-bottom: 30px;
}
</style>