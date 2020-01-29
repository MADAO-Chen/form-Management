import {request} from "./request";
export function getRoleData(pageNum,pageSize,query) {
    return  request({
        url:'/role/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}
export function addRole(roleName,authList) {
    return  request({
        url:'/role/add',
        method:'post',
        data:{
            roleName,
            authList,
        }
    })
}
export function getRoleMes(id) {
    return  request({
        url:'/role/get',
        method:'post',
        params:{
            id
        }
    })
}
export function updateRole(id,roleName,authList) {
    return  request({
        url:'/role/update',
        method:'post',
        data:{
            id,
            roleName,
            authList,
        }
    })
}
export function delRole(id) {
    return  request({
        url:'/role/delete',
        method:'post',
        params:{
            id
        }
    })
}
export function getAuth() {
    return  request({
        url:'/support/auth',
        method:'post',
    })
}