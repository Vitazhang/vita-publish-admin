// 文章相关请求模块
import request from '@/utils/request'

//获取文章列表
export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params
    })
};
// 获取文章频道
export const getArticleChannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
};
// 删除文档,
export const deletaAeticle = (aid) => {
    return request({
        method: 'DELETE',
        //参数要写在url中, 写 : 后面
        url: `/mp/v1_0/articles/${aid}`,
    })
};
//新建文章
export const addArticle = (data, draft = false) => {
    return request({
        method: 'POST',
        //参数要写在url中, 写 : 后面
        url: `/mp/v1_0/articles`,
        params: {
            draft, //是否存为草稿
        },
        data
    })
};
//获取文章
export const getArticle = (aid) => {
    return request({
        method: 'GET',
        //参数要写在url中, 写 : 后面
        url: `/mp/v1_0/articles/${aid}`,

    })
};
//编辑文章
export const updateArticle = (aid, data, draft = false) => {
    return request({
        method: 'PUT',
        //参数要写在url中, 写 : 后面
        url: `/mp/v1_0/articles/${aid}`,
        params: {
            draft, //是否存为草稿
        },
        data
    })
};