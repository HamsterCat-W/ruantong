<template>
  <div class="bodyer">
    <el-row>
      <el-col
        :span="5"
        :push="1"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img :src="item.imgSrc" class="goods-image" />
          <div class="decration">
            <div>{{ item.goodsName }}</div>
            <el-button
              type="text"
              class="button"
              @click="showDetail(item.goodsId)"
              >详情</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.getAllGoods();
  },

  methods: {
    async getAllGoods() {
      this.$axiosInstance.setToken();
      let data = await this.$request.get("/pv1/goods/api/goodslist");
      // console.log(data);
      this.dataList = data.data.data;
    },

    showDetail(value) {
      // console.log(value);
      this.$router.push({
        name: "GoodsDetail",
        params: {
          goodsId: value,
        },
      });
    },
  },
};
</script>

<style scoped>
.el-col {
  margin: 10px;
}

.goods-image {
  width: 100%;
  height: 300px;
  display: block;
}

.decration {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>