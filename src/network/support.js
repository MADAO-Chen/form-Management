import {request} from "./request";
export function getLockTemplate() {
    return  request({
        url:'/support/template',
        method:'post'
    })
}
//流程--部门人员
export function getDepPer(queryStr) {
    return  request({
        url:'/support/departUser',
        method:'post',
        params:{
            queryStr
        }
    })
}//流程--岗位人员
export function getJobPer(queryStr) {
    return  request({
        url:'/support/jobUser',
        method:'post',
        params:{
            queryStr
        }
    })
}