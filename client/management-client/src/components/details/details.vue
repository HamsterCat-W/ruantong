<template>
  <div class="goods-container">
    <el-row>
      <el-col :span="14">
        <div class="left" align="center">
          <img :src="goodsInfo.imgSrc" alt="" class="left-image" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="right">
          <div class="goodsName">{{ goodsInfo.goodsName }}</div>
          <div class="price">{{ goodsInfo.price }}&nbsp;元</div>
          <div class="repertory">剩余库存: {{ goodsInfo.repertory }}</div>
          <div class="opt">
            <div class="txt">购买数量：</div>
            <div class="sub">
              <button class="opt-btn" @click="sub">
                <span class="tag">-</span>
              </button>
            </div>
            <div class="num">{{ goodsNum }}</div>
            <div class="add">
              <button class="opt-btn" @click="add">
                <span class="tag">+</span>
              </button>
            </div>
          </div>
          <div class="addCar">
            <el-button type="primary" @click="addToCar">加入购物车</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: "",
      goodsNum: "1",
    };
  },

  computed: {},

  mounted() {
    this.getGoods();
  },
  methods: {
    async getGoods() {
      this.goodsId = this.$route.params.goodsId;
      this.$axiosInstance.setToken();
      let data = await this.$request.get("/pv1/goods/api/goods", {
        params: {
          goodsId: this.goodsId,
        },
      });

      this.goodsInfo = data.data.data;
      // console.log(this.goodsInfo);
    },

    sub() {
      if (this.goodsNum > 0) {
        this.goodsNum--;
      }
    },
    add() {
      if (this.goodsNum < this.goodsInfo.repertory) {
        this.goodsNum++;
      }
    },

    async addToCar() {
      // console.log("点击添加");
      this.$axiosInstance.setToken();
      let res = await this.$request.post("/pv1/goodscar/api/car", {
        num: this.goodsNum,
        goodsId: this.goodsId,
        userId: sessionStorage.getItem("userId"),
      });

      if (res.data.data) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
      }
    },
  },
};
</script>

<style scoped>
.left-image {
  height: 500px;
  width: 500px;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  height: 400px;
}

.goodsName {
  font-size: 16px;
  font-weight: 900;
}

.price {
  line-height: 40px;
  margin-top: 10px;
  height: 40px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: #dc143c;
  background-color: #d3d3d3;
}

.repertory {
  font-size: 16px;
  font-weight: 900;
}

.opt {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.opt-btn {
  width: 40px;
}

.tag {
  font-size: 20px;
  font-weight: 500;
}

.num {
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
  margin-right: 20px;
}
</style>