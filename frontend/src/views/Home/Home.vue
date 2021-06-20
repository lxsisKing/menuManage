<template>
  <div class="home">
    <el-container class="container">
      <el-aside width="12rem" class="aside">
        <div class="class-title">
          <div>
            菜品分类
          </div>
        </div>
        <div class="class-card-parent">
          <my-scroll>
            <food-class
              @click.native="showMenu(oneClass.id)"
              v-for="oneClass in foodClassList"
              :key="oneClass.id"
            >
              <div slot="className">
                <span class="first-word">{{ oneClass.name.slice(0, 1) }}</span>
                <span>{{ oneClass.name.slice(1) }}</span>
              </div>
            </food-class>
          </my-scroll>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header">
          <span class="title">
            <img height="100%" src="../../../public/image/title.jpg" />
          </span>
        </el-header>
        <el-main class="main">
          <food-menu ref="menu"></food-menu>
          <my-scroll>
            <selected-food-info-table></selected-food-info-table>
          </my-scroll>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// com
import FoodClass from "./components/FoodClass.vue";
import FoodMenu from "./components/FoodMenu.vue";
import SelectedFoodInfoTable from "./components/SelectedFoodInfoTable.vue";
export default {
  name: "Home",
  components: {
    FoodClass,
    FoodMenu,
    SelectedFoodInfoTable,
  },
  data() {
    return {};
  },
  computed: {
    foodClassList() {
      return this.$store.state.foods.foodClassList;
    },
  },
  methods: {
    showMenu(classId) {
      this.$refs.menu.showMenu(classId);
    },
  },
  mounted() {
    this.$store.dispatch("foodClassAction");
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
  .class-title {
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    padding: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    background-color: #c4b69d;
    margin: 8px 10px;
    border-radius: 10px;
  }
}

.aside {
  background-image: linear-gradient(#8a6455, #c58360);
  overflow: hidden;
  .class-card-parent {
    height: calc(100% - 4rem)
  }
}

.container {
  height: 100%;
  width: 100%;
}

.header {
  background-image: linear-gradient(90deg, #c7b49b, #f8efed);
  text-align: left;
  display: flex;
  align-items: center;
  // font-size: 1.5rem;
  .title {
    height: 100%;
    font-weight: bold;
    font-size: 1.8rem;
  }
}
.main {
  position: relative;
}

.first-word {
  font-size: 3rem;
}
/deep/.el-main {
  padding: 0;
}
</style>