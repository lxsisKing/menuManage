// apis
import {saveMenuApi, exportMenuFileApi} from "@/apis/foods.js"

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
              if(res.data.code == 200) {
                this.$message({
                  message: '保存成功',
                  center: true,
                  type: 'success',
                  showClose: true
                })
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
                  let filename = res.headers['content-disposition'].split(';')[1].split('=')[1].split("\"")[1]
                  this.uploadFile(res.data, filename)
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
          }
    },
}

export default executeApi