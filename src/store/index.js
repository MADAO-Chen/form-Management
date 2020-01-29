import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        user: {},
        menulist: []
    },
    getters: {
        getToken(state) {
            return state.token
        },
        getUser(state) {
            return state.user
        },
        getMenu(state) {
            return state.menulist
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUser(state, userInfo) {
            state.user = userInfo
        },
        setMenuList(state, menulist) {
            state.menulist = menulist
        }
    },
    actions: {
        menuObj(context, list) {
            let menulist = []
            list.forEach(item => {
                if (item.sort) {
                    menulist.push(item)
                }
            })
            menulist.forEach(item => {
                item.children = []
                list.forEach(menumax => {
                    if (item.id == menumax.parentId) {
                        item.children.push(menumax)
                    }
                })
            })
            context.commit('setMenuList', menulist)
        },
        updateUserInfo(context, user) {
            let userInfo = {}
            userInfo.userName = user.userName
            userInfo.email = user.email
            userInfo.sexId = user.sexId
            userInfo.mobilePhone = user.mobilePhone
            userInfo.headImg = user.headImg
            userInfo.userId = user.userId
            context.commit('setUser', userInfo)
        }
    },
    modules: {}
})
