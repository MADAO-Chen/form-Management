import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import {getList,getUser,auto} from "network/login";

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const FormMoudel = () => import('views/formmoudel/FormMoudel')
const FormProcess = () => import('views/formProcess/FormProcess')
const FormTotal = () => import('views/formTotal/FormTotal')
const SysMan = () => import('views/sysMan/SysMan')
const Login = () => import('views/login/Login')
const UpdatePSW = () => import('views/login/UpdatePSW')
const WorkBench = () => import('views/workbench/WorkBench')

const FMMoudel = () => import('views/formmoudel/formmoudelChildren/FMMoudel')
const FMNewMoudel = () => import('views/formmoudel/formmoudelChildren/FMNewMoudel')
const FMFilsh = () => import('views/formmoudel/formmoudelChildren/FMFilsh')
const FMInstance = () => import('views/formmoudel/formmoudelChildren/FMInstance')

const FPWidth = () => import('views/formProcess/fPChildren/FPWitch')
const FPAudit = () => import('views/formProcess/fPChildren/FPAudit')
const FPAddFlow = () => import('views/formProcess/fPChildren/FPAddFlow')

const FTList = () => import('views/formTotal/FTChildren/FTList')
const FTInfo = () => import('views/formTotal/FTChildren/FTInfo')

const SMDepartment = () => import('views/sysMan/SMChildren/SMDepartment')
const SMLog = () => import('views/sysMan/SMChildren/SMLog')
const SMOrgan = () => import('views/sysMan/SMChildren/SMOrgan')
const SMPermission = () => import('views/sysMan/SMChildren/SMPermission')
const SMPlayer = () => import('views/sysMan/SMChildren/SMPlayer')
const SMPosition = () => import('views/sysMan/SMChildren/SMPosition')
const SMUnit = () => import('views/sysMan/SMChildren/SMUnit')
const SMUser = () => import('views/sysMan/SMChildren/SMUser')

const WBHaveDo = () => import('views/workbench/WBChildren/WBHaveDo')
const WBToDo = () => import('views/workbench/WBChildren/WBToDo')
const WBTrack = () => import('views/workbench/WBChildren/WBTrack')


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/template',
        redirect: '/template/templateList'
    },
    {
        path: "/template/templateList",
        component: FormMoudel
    },
    {
        path: '/template/templateList/newMoudel',
        component: FMNewMoudel
    },
    {
        path: '/template/templateList/update',
        component: FMMoudel
    },
    {
        path: "/template/formInstanceList",
        component: FMFilsh
    },
    {
        path: "/template/formInstance",
        component: FMInstance
    },
    {
        path: "/workflow",
        component: FormProcess
    },
    {
        path: "/workflow/FLAdd",
        component: FPAddFlow
    },
    {
        path: '/workflow/FPWidth',
        component: FPWidth
    },
    {
        path: '/workflow/FPAudit',
        component: FPAudit
    },
    {
        path: "/statistics",
        component: FormTotal
    },
    {
        path: '/statistics/FTList',
        component: FTList
    },
    {
        path: '/statistics/FTInfo',
        component: FTInfo
    },
    {
        path: "/sys",
        redirect:'/sys/user'
    },
    {
        path: "/sys/department",
        component: SMDepartment
    },
    {
        path: '/sys/record',
        component: SMLog
    },
    {
        path: '/sys/org',
        component: SMOrgan
    },
    {
        path: "/sys/auth",
        component: SMPermission
    },
    {
        path: "/sys/role",
        component: SMPlayer
    },
    {
        path: "/sys/job",
        component: SMPosition
    },
    {
        path: "/sys/company",
        component: SMUnit
    },
    {
        path: "/sys/user",
        component: SMUser
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/login/update',
        component: UpdatePSW
    },
    {
        path: '/workstation',
        component: WorkBench,
    },
    {
        path: '/workstation/WBHaveDo',
        component: WBHaveDo
    },
    {
        path: '/workstation/WBToDo',
        component: WBToDo
    },
    {
        path: '/workstation/WBTrack',
        component: WBTrack
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let token = Vue.$cookies.get('token')
    if (to.path == '/login') {
        if (token) {
            if (store.getters.getMenu.length == 0) {
                getList().then(res => {
                    if (res.code == 200) {
                        store.dispatch('menuObj', res.data)
                        next('/workstation')
                    } else {
                        next()
                    }
                }).catch(err => {
                    next()
                })
                getUser().then(res=>{
                    if(res.code == 200){
                        let userInfo = res.data.userInfo
                        store.dispatch('updateUserInfo',userInfo)
                    }
                })
            } else {
                next('/workstation')
            }
        } else {
            next()
        }
    } else {
        if (token) {
            if (store.getters.getMenu.length == 0) {
                getList().then(res => {
                    if (res.code == 200) {
                        store.dispatch('menuObj', res.data)
                        next()
                    } else {
                        next('/login')
                    }
                }).catch(err => {
                    next('/login')
                })
                getUser().then(res=>{
                    if(res.code == 200){
                        let userInfo = res.data.userInfo
                        store.dispatch('updateUserInfo',userInfo)
                    }
                })
            } else {
                next()
            }
        } else {
            next('/login')
        }
    }
})
// router.beforeEach((to,from,next) => {
//         // console.log("先判断是否登录");
//     let token = Vue.$cookies.get('token')
//         if(to.name=='Login'){
//             next();
//         }else{
//             if(token){
//                 //访问服务器缓存数据，判断当前token是否失效
//                 auto(token).then(res => {
//                     // console.log('是否登录',num);
//                     if(res.code==200){
//                         next();
//                     }else{
//                         console.log('您的token已超时，请重新登录');
//                         next('/Login');
//                     }
//                 })
//             }else{
//                 next('/Login');
//             }
//
//         }
//
// })
export default router
