<template>
  <div style="padding: 20px">
    <div class="top-func">
      <el-date-picker
        v-model="selected_date"
        type="date"
        class="date-picker"
        @change="changeDate"
        :picker-options='pickerOptions'
      ></el-date-picker>
      <el-button type="primary" @click="saveMene"> 保存菜单 </el-button>
      <el-button type="primary" @click="exportMenuFileApi">
        导出菜单
      </el-button>
      <!-- <el-button type="primary"> 查看历史菜单 </el-button> -->
    </div>
    <div>
      <div v-for="classItem in foodClassList" :key="classItem.id">
        <div class="food-class-name" v-if="classItem.selected">
          <div class="food_name_content">
            <span class="first-word">{{ classItem.name.slice(0, 1) }}</span>
            <span>
              {{ classItem.name.slice(1) }}
            </span>
          </div>
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
import executeApi from "@/views/Home/components/SelectedFoodInfoTable/mixins/executeApi.js";
// coms
import FoodCard from "@/views/Home/components/FoodCard.vue";

export default {
  name: "SelectedFoodInfoTable",
  mixins: [foodsInfo, executeApi],
  components: {
    FoodCard,
  },
  data() {
    return {
      selected_date: null,
      old_selected_date: null,
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > this.$moment()
        }
      }
    };
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
  methods: {
    changeDate(value) {
      let picked_date= this.$moment(value).format('YYYY-MM-DD')
      this.getHistoryMenuInfo(picked_date)
    },

  },
  mounted() {
    this.selected_date = this.$moment();
  },
};
</script>
<style lang="less" scoped>
.top-func {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  .date-picker {
    margin-right: 10px;
  }
}
.food-class-name {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 15px 0;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  font-size: 1.3rem;
  .food_name_content {
    width: 30%;
    border-radius: 10px;
    background-color: #c1b79d;
    .first-word {
      font-size: 2.5rem;
    }
  }
}
.no-class {
  width: 100%;
  min-height: 500px;
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