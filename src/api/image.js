// 素材请求相关的模块
import request from '@/utils/request'

//上传图片素材
export const uploadImage = (data) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/user/images',
        data
    })
};

//获取图片素材
export const getImages = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/images',
        params
    })
};

//收藏素材列表
export const collectImage = (imageId, collect) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/user/images/${imageId}`,
        data: {
            collect
        }
    })
};

//删除素材
export const deleteImage = (imageId) => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/user/images/${imageId}`,

    })
};