import axios from 'axios'
import router from '@/router/router.js';


let axiosWithBaseUrlParams = axios.create({
  baseURL : 'http://vesti.mars-t.mars-hosting.com/api/'
});

axiosWithBaseUrlParams.interceptors.request.use((config)=>{
  var sid = localStorage.getItem('sid');
  if(sid!==null){
    config.params.sid=sid;
  }
  config.params.vf = 1
  return config;
});


export {axiosWithBaseUrlParams};
