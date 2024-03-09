import {
    UserLoginApi,
    UserVertifyLoginApi,
    UserRegisterApi,
    getPhoneVertifyApi,
    ResetUserNameApi,
    ResetPwdApi,
    getUserDataApi,
    resetUserAvatarApi
} from '../service/api/user/index.js'

const state = {
    needVerificate: false
}

const getters = {

}

const mutations = {
    setUserStatus(state, payload) {
        state.needVerificate = payload
    }
}

const actions = {
    handlderResponseStatusError({commit}, payload) {
        commit('setUserStatus', payload)
    },
    async getPhoneVertifyAction(_, payload) {
        return await getPhoneVertifyApi(payload)
    },
    async handlerUserLoginAction(_, payload) {
        return await UserLoginApi(payload)
    },
    async UserVertifyLoginActions(_, payload) {
        return await UserVertifyLoginApi(payload)
    },
    async RegisterAction(_, params) {
        return await UserRegisterApi(params)
    },
    async resetUserNameAction(_, params) {
        return await ResetUserNameApi(params)
    },
    async resetPasswordAction(_, params) {
        return await ResetPwdApi(params)
    },
    async getUserDataAction(_, params) {
        return await getUserDataApi(params)
    },
    async resetUserAvatarAction(_, params) {
        return await resetUserAvatarApi(params)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}