import axios from 'axios';
// 添加一个请求拦截器
axios.defaults.baseURL = '/api'
axios.interceptors.request.use(config => {
    // 举例，加上一个公共头部
    // config.headers.languagetype = 'CN'; 
    return config;
  },
  err => {
    return Promise.reject(err);
  });
//添加一个响应拦截器
axios.interceptors.response.use(response => {
  //在这里对返回的数据进行处理
  console.log(response.data, '网络正常');
  const res = {
    status: response.status,
    data: response.data
  }
  return res;
}, err => {
  console.log('网络开了小差！请重试...', err);
  const code = err.response?.data?.code
  const errParams = {
    status: err.response?.status,
    code,
    text: err.response?.data?.text,
    needVertify: false
  }
  if (err.response?.status === 403) {
    if (code === 65537) {
      errParams.needVertify = true
    }
    if (code === 65538) {
      localStorage.removeItem('SUMMON_WAR_SESSION')
    }
  }
  console.log(errParams, 'errParams---');
  return Promise.resolve(errParams);
})

export default axios 