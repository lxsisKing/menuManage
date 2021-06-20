<template>
  <div>
    <el-card shadow="always">
      <img
        height="100px"
        src="../../../../public/image/no-selected-foods.jpg"
      />
      <div class="food-info-display">
        <div>
          {{ foodInfo.name }}
        </div>
        <div>价格：{{ foodInfo.price }}</div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "FoodCard",
  props: {
      foodInfo: {
          type: Object
      }
  }
};
</script>
<style lang="less" scoped>
.food-info-display {
  height: 100%;
  width: 100%;
  display: flex;
  // flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>