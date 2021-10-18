<template>
  <div class="car-container" align="center">
    <div class="btn">
      <el-button type="primary" class="delbtn" @click="submitOrder"
        >提交订单</el-button
      >
      <el-button type="danger" class="delbtn" @click="deleteGoods"
        >删除商品</el-button
      >
    </div>
    <div class="goods-car" v-for="(item, index) in carList" :key="index">
      <el-card class="box-card">
        <div class="car-body">
          <div class="left">
            <img
              :src="item.goods[0].imgSrc"
              alt=""
              srcset=""
              class="left-img"
            />
          </div>
          <div class="right">
            <div class="goodInfo">
              <div class="goodname">{{ item.goods[0].goodsName }}</div>
              <div class="price">单价: {{ item.goods[0].price }} 元</div>
            </div>
            <div class="num">x {{ item.num }}</div>
          </div>
          <el-checkbox
            :key="item.goodsCarId"
            :checked="check"
            class="check-box"
            @change="handleCheckedChange(item)"
          ></el-checkbox>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      check: false,
      disabled: true,
      goods: [],
      carList: [],
      deleteList: [],
    };
  },

  mounted() {
    this.getCar();
  },
  methods: {
    async getCar() {
      this.$axiosInstance.setToken();
      let res = await this.$request.get("/pv1/goodscar/api/car", {
        params: {
          userId: sessionStorage.getItem("userId"),
        },
      });

      this.carList = res.data.data;
    },

    handleCheckedChange(value) {
      // console.log(value);
      // console.log(value.goodsCarId);
      let goodsCarId = value.goodsCarId;

      let pos = this.deleteList.indexOf(goodsCarId);
      if (pos == -1) {
        this.deleteList.push(goodsCarId);
        this.goods.push(value);
      } else {
        this.deleteList.splice(pos, 1);
        this.goods.splice(pos, 1);
      }

      console.log(this.goods);
      // console.log(this.deleteList);
    },

    async deleteGoods() {
      console.log(this.deleteList);

      let list = [];
      for (let i = 0; i < this.deleteList.length; i++) {
        list.push(this.deleteList[i]);
      }

      console.log(list);
      this.$axiosInstance.setToken();
      let res = await this.$request.delete("/pv1/goodscar/api/cars", {
        data: {
          goodsCarList: list,
        },
      });

      console.log(res.data.data);
      if (res.data.data === 1) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "error",
        });
      }
    },

    async submitOrder() {
      // this.$axiosInstance.setToken();

      console.log(this.goods[0]);
      let info = {
        sourcePlace: "新疆乌鲁木齐xxx街道",
        destPlace: "陕西省西安市长安区陕西师范大学",
        totalPrice: this.goods[0].goods[0].price * this.goods[0].num,
        customerId: sessionStorage.getItem("userId"),
        merchantId: "61653208432adb13343a53be",
        goodsId: this.goods[0].goods[0].goodsId,
        goodsCarId: this.goods[0].goodsCarId,
        num: this.goods[0].num,
      };

      console.log(info.goodsCarId);
      let res = await this.$request.post("/pv1/order/api/order", info);
      console.log(res.data.data);
      if (res.data.data) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "添加失败",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.car-container {
  width: 100%;
}

.goods-car {
  width: 50%;
  margin-bottom: 30px;
  background-color: blue;
  display: flex;
  align-items: center;
}

.box-card {
  width: 100%;
}

.car-body {
  width: 100%;
  display: flex;
  align-items: center;
}

.left-img {
  width: 100px;
  height: 100px;
  border-radius: 20%;
}

.right {
  width: 60%;
  margin-left: 40px;
  display: flex;
  align-items: center;
}

.num {
  margin-left: 200px;
}

.check-box {
  margin-left: 40px;
}

.btn {
  overflow: hidden;
}
.delbtn {
  margin-bottom: 10px;
  float: right;
  margin-right: 40px;
}
</style>