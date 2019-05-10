
import axios from 'axios'



let axiosWithBaseUrlParams = axios.create({
  baseURL : 'http://vesti.mars-t.mars-hosting.com/api'
});
let axiosWithBaseUrlOnly = axios.create({
  baseURL : 'http://vesti.mars-t.mars-hosting.com/api'

});

axiosWithBaseUrlParams.interceptors.request.use((config)=>{
  var sid = localStorage.getItem('sid');
  if(sid!==null){
    config.params.sid=sid;
  }
  config.params.vf = 0
  return config;
});

export {axiosWithBaseUrlParams,axiosWithBaseUrlOnly};
