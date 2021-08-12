//用户相关的请求模块

import request from '@/utils/request'

//登录请求
export const login = data => {
        return request({
            method: 'POST',
            url: '/mp/v1_0/authorizations',
            data,
        })
    }
    //获取用户信息
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjAyMDQ4NzIsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.-nLpCbNvi51R5lgwOoWRI6JQn1ODYmzIPwhL1YzP7bs'
        }
    })
}