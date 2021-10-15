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
            <el-button type="text" class="button">详情</el-button>
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
      let data = await this.$request("/pv1/goods/api/goodslist", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      console.log(data);

      this.dataList = data.data.data;
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