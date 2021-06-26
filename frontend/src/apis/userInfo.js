import axios from "../libs/axios"

export const loginApi = (data) => {
    /**
     * 获取菜品分类接口
     */
    return axios.request({
        url: 'foodlist/ver',
        method: 'post',
        data
    })
}