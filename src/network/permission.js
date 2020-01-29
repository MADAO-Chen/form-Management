import {request} from "./request";
export function getAuthData(pageNum,pageSize) {
    return  request({
        url:'/auth/list',
        method:'post',
        data:{
            pageNum,
            pageSize
        }
    })
}
export function addAuth(auth,authF) {
        return request({
            url:'/auth/add',
            method:'post',
            data:{
                auth,
                authF
            }
        })
}
export function getAuth(id) {
    return request({
        url:'/auth/get',
        method:'post',
        params:{
            id
        }
    })
}
export function updateAuth(auth,authF) {
    return request({
        url:'/auth/update',
        method:'post',
        data:{
            auth,
            authF
        }
    })
}
export function delAuth(id) {
    return request({
        url:'/auth/delete',
        method:'post',
        params:{
            id
        }
    })
}
export function getAllAuth() {
    return  request({
        url:'/support/auth',
        method:'post'
    })
}