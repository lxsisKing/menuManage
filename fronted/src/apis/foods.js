import axios from "../libs/axios"

export const getFoodClass = () => {
    /**
     * 获取菜品分类接口
     */
    return axios.request({
        url: 'foodlist/class',
        method: 'get',
    })
}

export const getFoods = (data) => {
    /**
     * 获取指定类别下的菜品信息
     */
    return axios.request({
        url: 'foodlist/foods',
        method: 'post',
        data,
    })
}