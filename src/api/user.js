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

    })
}

// 请求拦截器,
request.interceptors.request.use(
    // 任何请求都会经过这里
    //config 是当前请求相关的配置信息对象,可以修改
    function(config) {
        //统一做修改,然后再发
        const user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
            config.headers.Authorization = `Bearer ${user.token}`
        }

        // 不返回是发不出去的,修改好了,返回给他发
        return config
    },
    //请求失败就会经过这里
    function(error) {
        return Promise.reject(error)
    }
)