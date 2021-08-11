//基于 axios 封装的请求模块
import axios from 'axios'

//创建 axios 实例,通过实例发请求
const request = axios.create({
    //baseURL: 'http://ttapi.research.itcast.cn/', //请求的基础路径
    baseURL: 'http://api-toutiao-web.itheima.net'
})

export default request