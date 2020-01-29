import {request} from "./request";
export function getUnitData(pageNum,pageSize,query) {
    return  request({
        url:'/company/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}
export function addUnit(companyName) {
    return request({
        url:'/company/add',
        method:'post',
        params:{
            companyName
        }
    })
}
export function getUnit(id) {
    return request({
        url:'/company/get',
        method:'post',
        params:{
            id
        }
    })
}
export function updateUnit(id,companyName) {
    return request({
        url:'/company/update',
        method:'post',
        params:{
            id,
            companyName
        }
    })
}
export function delUnit(id) {
    return request({
        url:'/company/delete',
        method:'post',
        params:{
            id
        }
    })
}