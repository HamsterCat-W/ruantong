<template>
  <div class="bodyer">
    <el-row>
      <el-col :span="5" :push="1" v-for="i in 8" :key="i">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="goods-image"
          />
          <div class="decration">
            <div>汉堡</div>
            <el-button type="text" class="button">详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.el-col {
  margin: 10px;
}

.goods-image {
  width: 100%;
  display: block;
}

.decration {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>