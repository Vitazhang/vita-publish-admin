//基于 axios 封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'
//创建 axios 实例,通过实例发请求
const request = axios.create({
    //baseURL: 'http://ttapi.research.itcast.cn/', //请求的基础路径
    baseURL: 'http://api-toutiao-web.itheima.net',
    //定义后端返回的原始数据处理
    transformResponse: [function(data) {
        //data 是后端返回的原始数据,未被处理的json
        try {
            return JSONbig.parse(data)
        } catch (err) {
            return data
        }
    }]
})

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

//响应拦截器
request.interceptors.response.use((res) => {
    // 响应码为2xx的响应都会经过这里
    return res
}, (error) => {
    const status = error.response
        //超出都经过这里
    if (status === 401) {
        window.localStorage.removeItem('user')
        router.push('/login')
        Message('登录状态无效,请重新登录')
    } else if (status === 403) {
        //没有操作权限
        Message({
            type: 'warning',
            message: '没有操作权限'
        })
    } else if (status === 400) {
        // 客户端参数错误
        Message.error('参数错误,请检查请求参数')
    } else if (status === 500) {
        // 客户端参数错误
        Message('服务端内部异常,请稍后重试')
    }
    return Promise.reject(error)
})

export default request