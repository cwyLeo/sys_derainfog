import { $request } from "./request.js";

export const toNextDir = (items,path,parent_path,filename,imageAction) => {
    return $request({
        url:'/index',
        data:{
            items:items,
            path:path,
            parent_path:parent_path,
            filename:filename,
            imageAction:imageAction
        },
        method:'POST'
    })
}