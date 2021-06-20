<template>
  <div class="card-parent">
    <div class="card-shape">
      <div>
        <slot name="className"></slot>
      </div>
      <div>
        <i class="el-icon-caret-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FoodClass",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.card-parent {
  display: flex;
  justify-content: center;
  .card-shape {
    cursor: pointer;
    position: relative;
    width: 10rem;
    height: 5rem;
    background-color: antiquewhite;
    margin: 0.6rem 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    font-weight: bold;
    box-shadow: 0 0 10px #000000af;
  }
}
</style> 