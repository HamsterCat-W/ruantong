<template>
  <div class="goods-container">
    <el-row>
      <el-col :span="14">
        <div class="left" align="center">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            alt=""
            class="left-image"
          />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="right">
          <div class="goodsName">商品名称</div>
          <div class="price">10.00&nbsp;元</div>
          <div class="repertory">剩余库存: 10</div>
          <div class="opt">
            <div class="txt">购买数量：</div>
            <div class="sub">
              <button class="opt-btn"><span class="tag">-</span></button>
            </div>
            <div class="num">3</div>
            <div class="add">
              <button class="opt-btn"><span class="tag">+</span></button>
            </div>
          </div>
          <div class="addCar">
            <el-button type="primary">加入购物车</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
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