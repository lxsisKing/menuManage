<template>
  <div>
    <transition
      name="menu"
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <div id="menu" class="menu-box-base" v-if="show">
          <div
            v-for="(item) in foodData"
            :key="item.id"
            class="one-food"
            @click="selectFood(item)"
            :style="{ backgroundColor: isSelect(item.id) ? '#fff' : '' }"
          >
            <div>
              {{ item.name }}
            </div>

            <div v-show="isSelect(item.id)">
              <svg
                t="1618419356183"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1138"
                width="35"
                height="35"
              >
                <path
                  d="M993.123655 34.1906l-5.145524-5.401521A91.365052 91.365052 0 0 0 919.755138 0.015104c-25.522824 0.511992-49.663267 12.031823-67.019812 31.794731L329.479044 631.736986l-10.291048 4.607932-9.983853-4.966327-129.841285-159.28085c-18.815722-22.911662-45.746525-36.60746-74.597299-37.836242a101.01611 101.01611 0 0 0-77.208461 31.743531c-32.51152 34.201096-36.761058 88.062701-10.035052 127.306923l267.823249 394.182985c15.231775 22.476468 39.807413 35.634674 65.995827 35.634675h23.346855c44.08255 0 85.297942-22.630066 110.257574-60.619906L1005.05308 173.068551c28.415581-43.186563 23.346856-101.656101-11.903825-138.852352"
                  p-id="1139"
                  fill="#ff0000"
                ></path>
              </svg>
            </div>
          </div>
          <div class="close-menu">
            <el-button class="close-menu-button" @click="closeMenu()" > 收起菜单 </el-button>
          </div>
        
      </div>
    </transition>
  </div>
</template>
<script>
// mixins
import foodsInfo from "@/views/Home/mixins/foodsInfo.js"
// apis
import { getFoods } from "@/apis/foods.js";
export default {
  name: "FoodMenu",
  mixins: [foodsInfo],
  data() {
    return {
      show: false,
      classId: null,
      foodData: [],
    };
  },
  computed: {
    isSelect({ selectedFoodList }) {
      /**
       * 判断该菜品是否被选中
       */
      return (id) => {
        for (let x of selectedFoodList) {
          if (x.id == id) {
            return true;
          }
        }
        return false;
      };
    },
  },
  methods: {
    selectFood(data) {
      /**
       * 选择菜品
       */
      data.classId = this.classId;
      if (this.isSelect(data.id)) {
        this.$store.commit("deleteSelectedFood", data);
      } else {
        this.$store.commit("saveSelectedFoods", data);
      }
    },
    showMenu(id) {
      /**
       * 获取当前分类下的所有菜品数据
       */
      this.classId = id;
      let data = {
        id: id,
      };
      getFoods(data).then((res) => {
        if (res.data.code == 200) {
          this.foodData = res.data.data;
          if (!this.show) {
            this.show = true;
          }
        }
      });
    },
    closeMenu() {
      this.show = false;
    },
  },
};
</script>
<style lang="less" scoped>

.menu-box-base {
  border-radius: 5px;
  box-shadow: 0 0 10px #000000af;
  position: absolute;
  width: 15rem;
  z-index: 10;
  height: calc(100% - 40px);
  background-color: antiquewhite;
  //   --animate-duration: 1.2s;
  //   .add-food {
  //     width: 100%;
  //     padding: 10px 1rem 0;

  //     .button {
  //       width: 100%;
  //       font-weight: bold;dui
  //     }
  //   }
  .one-food {
    //   width: 50%;
    //   text-align-last: justify;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    height: 45px;
    margin: 10px 1rem;
    padding: 0.3rem 10px;
    // background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition-property: font-size, background-color;
    transition-duration: 0.2s;
    &:hover {
      transition-property: font-size, background-color;
      transition-duration: 0.2s;
      font-size: 18px;
      background-color: #fff;
    }
  }
}

.close-menu {
  width: 100%;
  .close-menu-button {
    height: 2rem;
    line-height: 2rem;
  }
}

/deep/.el-button {
  border-radius: 5px;
  padding: 0 20px;
}
</style>