//基于 axios 封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
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
export default request