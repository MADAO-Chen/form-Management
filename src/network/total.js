import {request} from "./request";
export function getTotalData(pageNum,pageSize,query) {
    return  request({
        url:'/formStatistics/list',
        method:'post',
        data:{
            pageNum,
            pageSize,
            query
        }
    })
}

