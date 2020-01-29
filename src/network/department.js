import {request} from "./request";
export function getDepData(pageNum,pageSize,query) {
    return  request({
        url:'/depart/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}
export function addDep(departName) {
    return request({
        url:'/depart/add',
        method:'post',
        params:{
            departName
        }
    })
}
export function getDep(id) {
    return request({
        url:'/depart/get',
        method:'post',
        params:{
            id
        }
    })
}
export function updateDep(id,departName) {
    return request({
        url:'/depart/update',
        method:'post',
        params:{
            id,
            departName
        }
    })
}
export function delDep(id) {
    return request({
        url:'/depart/delete',
        method:'post',
        params:{
            id
        }
    })
}