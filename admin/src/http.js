// 接口相关的方法封装的文件

import axios from 'axios';
import Vue from 'vue';
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
});

http.interceptors.response.use(res =>{
    return res;
}, err =>{
    console.log(err.response.data);
    if (err.response.data.message){
        Vue.prototype.$message({message:err.response.data.message, type: 'error'})
    }
    return Promise.reject(err);
})

export default http;