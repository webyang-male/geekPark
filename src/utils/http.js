//封装axios
import axios from "axios";
import { getToken, clearToken, history } from '@/utils'

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

http.interceptors.request.use(config => {
  // if not login add token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response.data);
    return response.data;
    
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export { http };
