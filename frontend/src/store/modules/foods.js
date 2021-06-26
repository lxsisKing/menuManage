import {
    getFoodClass,
    getHistoryMenuApi
} from "@/apis/foods.js"
import moment from 'moment'
const state = {
    foodClassList: [],
    selectedFoodList: [],
}
const mutations = {
    saveFoodClass(state, data) {
        /**
         * 保存菜品分类
         */
        state.foodClassList = [...data];
    },
    saveSelectedFoods(state, data) {
        /**
         * 存储已选择的菜品信息
         */
        for (let x of state.foodClassList) {
            if (x.id == data.classId) {
                if (!x.selected) {
                    x.selected = true
                }
                break;
            }

        }
        let selectedFoodList = [...state.selectedFoodList];
        selectedFoodList.push(data)
        state.selectedFoodList = [...selectedFoodList]
    },
    deleteSelectedFood(state, data) {
        /**
         * 删除已选择的某样菜品
         */
        let count = 0;
        let index = null;
        let selectedFoodList = [...state.selectedFoodList];
        let id = data.id;
        let thisClassId = data.classId
        for (let food of selectedFoodList) {
            if (food.id == id) {
                index = selectedFoodList.indexOf(food);
                    break;
            }
        }
        selectedFoodList.splice(index, 1);
        for(let food of selectedFoodList) {
            if(food.classId == thisClassId) {
                count += 1
                break;
            }
        }
        if(count == 0) {
            for(let x of state.foodClassList) {
                if(x.id == thisClassId) {
                    x.selected = false
                    break;
                }
            }
        }
        state.selectedFoodList = [...selectedFoodList]

    },
    saveHistoryMenuInfo(state, data) {
        /**
         * 存储菜单的菜品信息
         */
        state.selectedFoodList = [...data]
    },
    setDefaultClassInfo(state) {
        /**
         * 重置菜品分类信息
         */
        for(let x of state.foodClassList) {
            if(x.selected) {
                x.selected = false
            }
        }
    }
}
const getters = {

}
const actions = {
    async foodClassAction({
        commit,
        state
    }) {
        /**
         * 请求获取菜品信息
         */
        const res = await getFoodClass()
        if (res.data.code == 200) {
            commit("saveFoodClass", res.data.data)
            let data = {
                date: moment().format('YYYY-MM-DD'),
              }
  
              getHistoryMenuApi(data).then(res => {
                if(res.data.code == 200) {
                  let selected_food = res.data.data
                  let selected_class = selected_food.map(x => {
                    return x.classId
                  })
                  let foodClassList = [...state.foodClassList]
                  for(let x of foodClassList) {
                    if(!x.selected && selected_class.indexOf(x.id) != -1) {
                      x.selected = true
                    }
                  }
                  commit("saveFoodClass", foodClassList)
                  commit("saveHistoryMenuInfo", res.data.data)
                }
              })
        }
    }
}



export default {
    state,
    mutations,
    getters,
    actions,
}