import {axiosWithBaseUrl} from './config.js'

export default {

    registerApi(user){
      return axiosWithBaseUrl({
      url: 'register',
      method: 'POST',
      data: {
        user: user
      }
    });
  },
  loginApi(user){
    return axiosWithBaseUrl({
      url: 'login',
      method: 'POST',
      data: {
        user: user
      }
    });
  },
  logoutApi(params){
    return axiosWithBaseUrl({
      url: 'logout',
      method: 'POST',
      data: {
        sid: params.sid
      }
    });
  },
  proveriKorisnikaApi(param){
    return axiosWithBaseUrl({
      url: 'proveriKorisnika',
      method: 'POST',
      data: {
        sid: param.sid
      }
    });
  },
  userTeme(params){
    return axiosWithBaseUrl({
      url: 'userTeme',
      method: 'POST',
      data: {
        username: params
      }
    });
  },
  userKomentari(params){
    return axiosWithBaseUrl({
      url: 'userKomentari',
      method: 'POST',
      data: {
        username: params
      }
    });
  },
  osobaInfoApi(params){
    return axiosWithBaseUrl({
      url: 'osobaInfo',
      method: 'POST',
      data: {
        sid: params.sid,
        username:params.username
      }
    });
  },
  updateInfoApi(param){
    return axiosWithBaseUrl({
      url: 'updateInfo',
      method: 'POST',
      data: {
        sid: param.sid,
        osobaInformacije: param.osobaInformacije
      }
    });
  },
  izlistajPorukeApi(sid){
    return axiosWithBaseUrl({
      url: 'izlistajPoruke',
      method: 'POST',
      data: {
        sid: sid
      }
    });
  },
  obrisiPorukuApi(param){
    return axiosWithBaseUrl({
      url: 'obrisiPoruku',
      method: 'POST',
      data: {
        sid: param.sid,
        porId: param.porId
      }
    });
  },
  procitajPorukuApi(param){
    return axiosWithBaseUrl({
      url: 'procitajPoruku',
      method: 'POST',
      data: {
        sid: param.sid,
        porId: param.porId
      }
    });
  },
  posaljiPorukuApi(param){
    return axiosWithBaseUrl({
      url: 'posaljiPoruku',
      method: 'POST',
      data: {
        sid: param.sid,
        popupTo: param.popupTo,
        popupTekst: param.popupTekst
      }
    });
  },
  novePorukeApi(param){
    return axiosWithBaseUrl({
      url: 'novePoruke',
      method: 'POST',
      data: {
        sid: param,
      }
    });
  },
  awwardsApi(user){
    return axiosWithBaseUrl({
      url: 'awwards',
      method: 'POST',
      data: {
        username: user,
      }
    });
  }

}
