import {request} from "./request";
export function getLogData(pageNum,pageSize,query) {
    return  request({
        url:'/record/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}