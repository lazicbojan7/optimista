import axios from 'axios'

let axiosWithBaseUrl = axios.create({
  baseURL : 'http://vesti.mars-t.mars-hosting.com/api/'
});

export {axiosWithBaseUrl};
