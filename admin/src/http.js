// 接口相关的方法封装的文件

import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
});

export default http;