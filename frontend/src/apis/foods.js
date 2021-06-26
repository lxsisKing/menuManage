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

export const saveMenuApi = (data) => {
    /**
     * 保存当日菜单
     */
    return axios.request({
        url: 'foodlist/save_menu',
        method: 'post',
        data
    })
}

export const exportMenuFileApi = (data) => {
    /**
     * 导出菜单文件
     */
    return axios.request({
        url: 'foodlist/export_menu',
        method: 'post',
        data,
        responseType: 'blob'
    })
}

export const getHistoryMenuApi = (data) => {
    /**
     * 获取历史菜单数据
     */
    return axios.request({
        url: 'foodlist/get_history_menu',
        method: 'post',
        data,
    })
}