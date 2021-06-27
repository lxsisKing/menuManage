const state = {
    token: null
}
const mutations = {
    setToken(state, data) {
        /**
         * 存储token
         */
        state.token = data
    },
    // resetToken(state) {
    //     state.token = null
    // }
}
const getters = {

}
const actions = {

}

export default {
    state,
    mutations,
    getters,
    actions
}