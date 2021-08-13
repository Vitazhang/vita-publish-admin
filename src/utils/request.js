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

export default request