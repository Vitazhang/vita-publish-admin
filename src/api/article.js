// 文章相关请求模块
import request from '@/utils/request'

//获取文章列表
export const getArticles = (params) => {
        return request({
            method: 'GET',
            url: '/mp/v1_0/articles',
            params
        })
    }
    // 获取文章频道
export const getArticleChannels = () => {
        return request({
            method: 'GET',
            url: '/mp/v1_0/channels'
        })
    }
    // 删除文档
export const deletaAeticle = (aid) => {
    return request({
        method: 'DELETE',
        //参数要写在url中, 写 : 后面
        url: `/mp/v1_0/articles/${aid}`,
    })
}