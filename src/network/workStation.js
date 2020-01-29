import {request} from "./request";
export function getWorkStationData() {
    return request({
        url:'/staging/show',
        method:'post'
    })
}
export function getToDoData(pageNum,pageSize,query) {
    return request({
        url:'/staging/inWriter',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}
export function getAuditData(pageNum,pageSize,query) {
    return request({
        url:'/staging/audit',
        method:'post',
        data:{
            pageSize,
            pageNum,
            query
        }
    })
}
export function getTrackData(pageNum,pageSize,query) {
    return request({
        url:'/staging/tracking',
        method:'post',
        data:{
            pageSize,
            pageNum,
            query
        }
    })
}
export function getEndData(pageNum,pageSize,query) {
    return request({
        url:'/staging/endList',
        method:'post',
        data:{
            pageSize,
            pageNum,
            query
        }
    })
}
export function passForm(wkfInstId,wkfId,formInstId) {
    return request({
        url:'/staging/pass',
        method:'post',
        data:{
            wkfInstId,
            wkfId,
            formInstId
        }
    })
}
export function unpassForm(wkfInstId,wkfId,formInstId) {
    return request({
        url:'/staging/reject',
        method:'post',
        data:{
            wkfInstId,
            wkfId,
            formInstId
        }
    })
}