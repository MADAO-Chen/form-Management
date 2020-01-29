import {request} from "./request";
export function getTemplateList(pageNum,pageSize,query) {
    return request({
        url:'/formTemplate/list',
        method:'post',
        data:{
            pageSize,
            pageNum,
            query
        }
    })
}
export function addTemplate(templateName,controlList) {
    return request({
        url:'/formTemplate/add',
        method:'post',
        data:{
            templateName,
            controlList
        }
    })
}
export function getTemplate(id) {
    return request({
        url:'/formTemplate/get',
        method:'post',
        params:{
            id
        }
    })
}
export function getTemplateFilshList(pageNum,pageSize,query) {
    return request({
        url:'/formInst/list',
        method:'post',
        data:{
            pageSize,
            pageNum,
            query
        }
    })
}
export function getAllTemplateKind() {
    return request({
        url:'/support/template',
        method:'post'
    })
}
export function getTemplateInstance(id) {
    return request({
        url:'/formInst/get',
        method:'post',
        params:{
            id
        }
    })
}
export function getWkfInst(formInstId) {
    return request({
        url:'/wkfInst/get',
        method:'post',
        params:{
            formInstId
        }
    })
}
export function sendTempalte(id) {
    return request({
        url:'/formTemplate/lock',
        method:'post',
        params:{
            id
        }
    })
}