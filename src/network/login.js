import {request} from "./request";
export function login(loginName,password,isAuto) {
   return  request({
        url:'/login',
        method:'post',
        params:{
            loginName,
            password,
            isAuto
        }
    })
}
export function auto(token) {
    return  request({
        url:'/auto',
        method:'post',
        params: {
            token
        }
    })
}
export function getList() {
    return  request({
        url:'/getInfo',
        method:'post'
    })
}
export function getUser() {
    return  request({
        url:'/sui',
        method:'post'
    })
}
export function updatePSW(oldPwd,newPwd) {
    return  request({
        url:'/center/updatePwd',
        method:'post',
        params:{
            oldPwd,
            newPwd
        }
    })
}