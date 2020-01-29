import {request} from "./request";
export function getCompany() {
    return  request({
        url:'/support/company',
        method:'post'
    })
}
export function getDepart() {
    return  request({
        url:'/support/depart',
        method:'post'
    })
}
export function getJob() {
    return  request({
        url:'/support/job',
        method:'post'
    })
}
//用户管理
export function getData(pageNum,pageSize,query) {
    return  request({
        url:'/sysUser/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}
export function addUser(query) {
    return  request({
        url:'/sysUser/add',
        method:'post',
        data:{
            query
        }
    })
}
export function getUser(userId) {
    return  request({
        url:'/sysUser/queryUserInfo',
        method:'post',
        params:{
            userId
        }
    })
}

export function updateUser(userId,userName,headImg,sexId,email,
                           mobilePhone,fixPhone,jobId,departmentId,organizationId,companyId,) {
    return  request({
        url:'/sysUser/update',
        method:'post',
        data:{
            userId,
            userName,
            headImg,
            sexId,
            email,
            mobilePhone,
            fixPhone,
            jobId,
            departmentId,
            organizationId,
            companyId,
        }
    })
}
export function delUser(userId) {
    return  request({
        url:'/sysUser/delete',
        method:'post',
        params:{
            userId
        }
    })
}

//组织结构

//日志管理
