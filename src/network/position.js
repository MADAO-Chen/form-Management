import {request} from "./request";
export function getJobData(pageNum,pageSize,query) {
    return  request({
        url:'/job/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}
export function addJob(jobName) {
    return request({
        url:'/job/add',
        method:'post',
        params:{
            jobName
        }
    })
}
export function getJob(id) {
    return request({
        url:'/job/get',
        method:'post',
        params:{
            id
        }
    })
}
export function updateJob(id,jobName) {
    return request({
        url:'/job/update',
        method:'post',
        params:{
            id,
            jobName
        }
    })
}
export function delJob(id) {
    return request({
        url:'/job/delete',
        method:'post',
        params:{
            id
        }
    })
}