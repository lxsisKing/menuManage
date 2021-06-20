<template>
  <div>
    <div class="top-func" v-if="nowSelectedClassLength != 0">
      <el-button type="primary"> 保存菜单 </el-button>
      <el-button type="primary"> 查看历史菜单 </el-button>
    </div>
    <div>
      <div v-for="classItem in foodClassList" :key="classItem.id">
        <div class="food-class-name" v-if="classItem.selected">
          <span class="first-word">{{ classItem.name.slice(0, 1) }}</span>
          <span>
            {{ classItem.name.slice(1) }}
          </span>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col
              :span="6"
              v-for="foodInfo in nowClassFoodsInfo(classItem.id)"
              :key="foodInfo.id"
            >
              <food-card :food-info="foodInfo"></food-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="no-class" v-if="nowSelectedClassLength == 0">
      <div></div>
      <div>没有选中任何菜品哦</div>
    </div>
  </div>
</template>
<script>
// mixins
import foodsInfo from "@/views/Home/mixins/foodsInfo.js";
// coms
import FoodCard from "@/views/Home/components/FoodCard.vue";
export default {
  name: "SelectedFoodInfoTable",
  mixins: [foodsInfo],
  components: {
    FoodCard,
  },
  data() {
    return {};
  },
  computed: {
    foodClassList() {
      /**
       * 所有分类
       */
      return this.$store.state.foods.foodClassList;
    },
    nowSelectedClassLength({ foodClassList }) {
      /**
       * 有选中的菜品分类
       */
      let selectedFoodClassList = foodClassList.filter((classItem) => {
        return classItem.selected == true;
      });
      return selectedFoodClassList.length;
    },
    nowClassFoodsInfo({ selectedFoodList }) {
      /**
       * 获取当前类别下的所有菜品
       */
      return (classId) => {
        let foodsInfo = selectedFoodList.filter((x) => {
          return x.classId == classId;
        });
        return foodsInfo;
      };
    },
  },
};
</script>
<style lang="less" scoped>
.top-func {
  float: right;
}
.food-class-name {
  width: 100%;
  padding: 20px 0;
  font-size: 1rem;
  font-weight: bold;
  .first-word {
    font-size: 3rem;
  }
}
.no-class {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
}
.food-info-display {
  height: 100%;
  width: 100%;
  display: flex;
  // flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>