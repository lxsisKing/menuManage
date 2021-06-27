// apis
import {
  saveMenuApi,
  exportMenuFileApi,
  getHistoryMenuApi
} from "@/apis/foods.js"
// config
import config from "@/config"
const executeApi = {
  data() {
    return {

    }
  },
  methods: {
    saveMene() {
      /**
       * 保存当日菜单
       */
      let selectedFoodList = JSON.stringify(this.selectedFoodList)
      let data = {
        date: this.$moment(this.selected_date).format('YYYY-MM-DD'),
        content: selectedFoodList
      }
      saveMenuApi(data).then(res => {

        let messageProperty = {
          ...config.messageProperty
        }
        messageProperty.message = '保存成功'
        if (res.data.code == 200) {
          this.$message.success(messageProperty)
        }
      })
    },
    exportMenuFileApi() {
      /**
       * 执行导出接口
       */
      let data = {
        date: this.$moment(this.selected_date).format('YYYY-MM-DD'),
      }
      exportMenuFileApi(data).then(res => {
        if (res.data.code) {
          return
        } else {
          let filename = res.headers['content-disposition'].split(';')[1].split('=')[1].split("\"")[1]
          this.uploadFile(res.data, filename)
        }

      })
    },
    uploadFile(blob, filename) {
      /**
       * 新建a标签进行链接下载
       */
      const alink = document.createElement('a')
      alink.download = filename
      alink.style.display = 'none'
      alink.href = URL.createObjectURL(blob)
      document.body.appendChild(alink)
      alink.click()
      URL.revokeObjectURL(alink.href)
      document.body.removeChild(alink)
    },
    getHistoryMenuInfo(date) {
      /**
       * 保存选择的历史菜单信息
       */
      let data = {
        date: date,
      }

      getHistoryMenuApi(data).then(res => {
        if (res.data.code != 401) {
          if (res.data.code == 404) {
            let messageProperty = {
              ...config.messageProperty
            }
            messageProperty.message = res.data.message
            this.$message.warning(messageProperty)
          }
          let selected_food = res.data.data
          let selected_class = selected_food.map(x => {
            return x.classId
          })
          let foodClassList = [...this.foodClassList]
          for (let x of foodClassList) {
            if (selected_class.indexOf(x.id) != -1) {
              x.selected = true
            } else {
              x.selected = false
            }
          }
          this.old_selected_date = this.selected_date
          this.$store.commit("saveFoodClass", foodClassList)
          this.$store.commit("saveHistoryMenuInfo", selected_food)
        }

      })
    }
  },
  mounted() {},
}

export default executeApi