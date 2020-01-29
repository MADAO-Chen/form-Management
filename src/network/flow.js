import {request} from "./request";
export function getFlow(formInstId) {
    return  request({
        url:'/wkfInst/get',
        method:'post',
        params:{
            formInstId
        }
    })
}
export function getFlowList(pageNum,pageSize,query) {
    return  request({
        url:'/wkf/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}