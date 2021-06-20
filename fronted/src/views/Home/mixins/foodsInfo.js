const foodsInfo = {
    data() {
        return {

        }
    },
    computed: {
        selectedFoodList() {
            /**
             * 获取已选择的菜品信息
             */
            return this.$store.state.foods.selectedFoodList;
        },
    }
}

export default foodsInfo