import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
        // baseURL: process.env.VUE_APP_API_URL || '/web/api'
        baseURL: ' http://localhost:3000/web/api'

    })
    // Add a request interceptor
http.interceptors.request.use(function(config) {
    // Do something before request is sent
    if (localStorage.token) {
        // 前面加bearer空格 是一个行业规范
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;

}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 全局拦截后端的响应(报错信息),给http请求加一个拦截器

http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {

        // 使用vue里面的$message方法来显示提示信息
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })

        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)

})

export default http