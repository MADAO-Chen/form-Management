import {request} from "./request";
export function getAllOrgan() {
    return  request({
        url:'/support/op',
        method:'post'
    })
}
export function getOrganData(pageNum,pageSize) {
    return  request({
        url:'/org/list',
        method:'post',
        data:{
            pageNum,
            pageSize
        }
    })
}
export function addOrgan(orgName,parentId) {
    return request({
        url:'/org/add',
        method:'post',
        data:{
            orgName,
            parentId
        }
    })
}
export function getOrgan(id) {
    return request({
        url:'/org/get',
        method:'post',
        params:{
            id
        }
    })
}
export function updateOrgan(id,orgName,parentId) {
    return request({
        url:'/org/update',
        method:'post',
        data:{
            id,
            orgName,
            parentId
        }
    })
}
export function delOrgan(id) {
    return request({
        url:'/org/delete',
        method:'post',
        params:{
            id
        }
    })
}