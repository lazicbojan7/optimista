import {axiosWithBaseUrlParams} from './config.js'

export default {

  takeCategoriesApi : function(){
    return axiosWithBaseUrlParams({
          url: 'kategorijeApi',
          method: 'post',
          params:{}
        });
  },
  sendTemaApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'posaljiTemuApi',
          method: 'post',
          data:{
            kat: params.tema,
            naslov : params.naslov,
            sazetak: params.sazetak,
            tekst: params.tekst
          },
          params:{}
        });
  },
  temaShowApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'fListaTemaBeta',
          method: 'post',
          data:{
            filter : params.filter,
            kat: params.tema,
            id: params.komentari,
            strana: params.strana
          },
          params:{}
        });
  },
  dodajPregledApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'dodajPregledApi',
          method: 'post',
          data:{

            id: params,
          },
          params:{}
        });
  },

  updateCommApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'azurirajKomentar',
          method: 'post',
          data:{
            id: params
          },
          params:{

          }
        });
  },
  updateTemaApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'fListaTemaBeta',
          method: 'post',
          data:{
            id: params
          },
          params:{

          }
        });
  },
  showCommApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'komentariTemeApi',
          method: 'post',
          data:{
            id: params.tma_id,
            strana: params.strana
          },
          params:{

          }
        });
  },
  showRepliesApi: function(param){
    return axiosWithBaseUrlParams({
          url: 'odgNaKomApi',
          method: 'post',
          data:{
            id:param
          },
          params:{

          }
        });
  },
  sendFirstCommApi:  function(params){
    return axiosWithBaseUrlParams({
          url: 'posaljiPrviKomentarApi',
          method: 'post',
          data:{
            sid:localStorage.getItem('sid'),
            tma_id:params.tma_id,
            pst_tekst:params.pst_tekst
          },
          params:{

          }
        });
  },
  sendCommApi:  function(param){
    return axiosWithBaseUrlParams({
          url: 'posaljiKomentarApi',
          method: 'post',
          data:{
            sid:localStorage.getItem('sid'),
            ref_id:param.pst_id,
            tma_id:param.tma_id,
            pst_tekst:param.pst_tekst,
            pst_quote:param.quote
          },
          params:{

          }
        });
  },
  likeTemaApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'likeNaTemuApi',
          method: 'post',
          data:{
            sid:localStorage.getItem('sid'),
            tma_id : params
          },
          params:{

          }
        });
  },
  likeReplyApi:  function(param){
    return axiosWithBaseUrlParams({
          url: 'likeNaPostApi',
          method: 'post',
          data:{
            sid:localStorage.getItem('sid'),
            pst_id : param
          },
          params:{

          }
        });
  },
  reporForumtApi:  function(param){
    return axiosWithBaseUrlParams({
          url: 'reportForumApi',
          method: 'post',
          data:{
            pst_id : param.pst_id,
            tma_id : param.tma_id
          },
          params:{

          }
        });
  },
  listaTemaApi : function(){
    return axiosWithBaseUrlParams({
          url: 'neodobreneVesti',
          method: 'post',
          data: {

          },
          params: {

            }
        });
  },
  objaviTemuApi : function(tma_id){
    return axiosWithBaseUrlParams({
      url: 'objaviTemuf',
      method: 'post',
      data: {
        sid:localStorage.getItem('sid'),
        tma_id : tma_id
      },
      params: {

        }
    });
  },
  obrisiTemuApi : function(tma_id){
    return axiosWithBaseUrlParams({
      url: 'obrisiTemuf',
      method: 'post',
      data: {
        tma_id : tma_id
      },
      params: {

        }
    });
  },
  listaKorisnikaApi : function(){
    return axiosWithBaseUrlParams({
          url: 'prijavljeniKorisnici',
          method: 'post',
          data: {

          },
          params: {

            }
        });
  },
  blokirajKorisnikaApi : function(osb_id){
    return axiosWithBaseUrlParams({
      url: 'blokirajKorisnikaf',
      method: 'post',
      data: {
        osb_id : osb_id
      },
      params: {

        }
    });
  },
  // oznaciKorisnikaOkApi : function({id : id, limit : limit}){
  //   return axiosWithBaseUrlParams({
  //     url: 'oznaciKorisnikaOk',
  //     method: 'post',
  //     data: {
  //       osb_id : id
  //     }
  //   });
  // },
  pretraziKorisnikeApi: function(search){
    return axiosWithBaseUrlParams({
      url: 'searchApi',
      method: 'post',
      data: {
        search : search
      },
      params: {

        }
    });
  },
  sviKorisniciApi : function(upit){
    var limit = upit.limit;
    var start = upit.start;
    return axiosWithBaseUrlParams({
          url: 'sviKorisnici',
          method: 'post',
          data: {
            limit : limit,
            start : start
          },
          params: {

            }
        });
  },
    prijavljeniKomentariApi : function(upit){

    return axiosWithBaseUrlParams({
          url: 'prijavljeniKomentari',
          method: 'post',
          data: {

          },
          params: {

            }
        });
  },
  listaKategorijaApi : function(){
    return axiosWithBaseUrlParams({
      url: 'kategorijeApiForumCms',
      method: 'post',
      data: {

      },
      params: {

        }
    });
  },
  dodajKategorijuApi: function(kat){
    return axiosWithBaseUrlParams({
      url: 'dodajKategorijuF',
      method: 'post',
      data: {
        kat : kat
      },
      params: {

        }
    });
  },
  obirisKategorijuApi: function(selected){
    return axiosWithBaseUrlParams({
      url: 'obirisKategorijuf',
      method: 'post',
      data: {
        selected : selected
      },
      params: {

        }
    });
  },
  SviKomentariKorisnikaApi: function(osb_id){
    return axiosWithBaseUrlParams({
      url: 'prikazKomentaraCms',
      method: 'post',
      data: {
        osb_id : osb_id,
        prijavljen : 1
      },
      params:{}
    });
  },
  SviKomentariSvihKorisnikaApi: function(osb_id){
    return axiosWithBaseUrlParams({
      url: 'prikazKomentaraSvihKorisnikaCms',
      method: 'post',
      data: {
        osb_id : osb_id
      },
      params:{}
    });
  },
  odobriKomentarApi: function(pst_id){
    return axiosWithBaseUrlParams({
      url: 'odobriKomentarf',
      method: 'post',
      data: {
        pst_id : pst_id
      },
      params: {

        }
    });
  },
  blokirajKomentarApi: function(pst_id){
    return axiosWithBaseUrlParams({
      url: 'blokirajKomentarf',
      method: 'post',
      data: {
        pst_id : pst_id
      },
      params: {

        }
    });
  },
oznaciKorisnikaOkApi: function(id){
  return axiosWithBaseUrlParams({
    url: 'oznaciKorisnikaOk',
    method: 'post',
    data: {
      osb_id : id
    },
    params: {

      }
  });
},
vratiKorisnikaUZivot: function(osb_id){
  return axiosWithBaseUrlParams({
    url: 'vratiKorisnikaUZivotA',
    method: 'post',
    data: {
      osb_id : osb_id
    },
    params: {

      }
  });
},
postaviModeratoraApi: function(osb_id){
  return axiosWithBaseUrlParams({
    url: 'postaviModeratoraApi',
    method: 'post',
    data: {
      osb_id : osb_id
    },
    params: {

    }
  });
},
searchForumApi:function(params){
  return axiosWithBaseUrlParams({
    url:"searchForum",
    method:'post',
    data:{
      search:params.search
    }
  });
},
  showRepliesApi: function(param){
    return axiosWithBaseUrlParams({
          url: 'odgNaKomApi',
          method: 'post',
          data:{
            id:param
          },
          params:{

          }
        });
  },
  sendFirstCommApi:  function(params){
    return axiosWithBaseUrlParams({
          url: 'posaljiPrviKomentarApi',
          method: 'post',
          data:{
              tma_id:params.tma_id,
            pst_tekst:params.pst_tekst
          },
          params:{

          }
        });
  },
  sendCommApi:  function(param){
    return axiosWithBaseUrlParams({
          url: 'posaljiKomentarApi',
          method: 'post',
          data:{
            ref_id:param.pst_id,
            tma_id:param.tma_id,
            pst_tekst:param.pst_tekst
          },
          params:{

          }
        });
  },
  likeTemaApi: function(params){
    return axiosWithBaseUrlParams({
          url: 'likeNaTemuApi',
          method: 'post',
          data:{
            tma_id : params
          },
          params:{

          }
        });
  },
  likeReplyApi:  function(param){
    return axiosWithBaseUrlParams({
          url: 'likeNaPostApi',
          method: 'post',
          data:{
            pst_id : param
          },
          params:{

          }
        });
  },
  reporForumtApi:  function(param){
    return axiosWithBaseUrlParams({
          url: 'reportForumApi',
          method: 'post',
          data:{
            pst_id : param.pst_id,
            tma_id : param.tma_id
          },
          params:{

          }
        });
  },
  listaTemaApi : function(){
    return axiosWithBaseUrlParams({
          url: 'neodobreneVesti',
          method: 'post',
          data: {

          },
          params: {

            }
        });
  },
  objaviTemuApi : function(tma_id){
    return axiosWithBaseUrlParams({
      url: 'objaviTemuf',
      method: 'post',
      data: {
        tma_id : tma_id
      },
      params: {

        }
    });
  },
  obrisiTemuApi : function(tma_id){
    return axiosWithBaseUrlParams({
      url: 'obrisiTemuf',
      method: 'post',
      data: {
        tma_id : tma_id
      },
      params: {

        }
    });
  },
  listaKorisnikaApi : function(){
    return axiosWithBaseUrlParams({
          url: 'prijavljeniKorisnici',
          method: 'post',
          data: {

          },
          params: {

            }
        });
  },
  blokirajKorisnikaApi : function(osb_id){
    return axiosWithBaseUrlParams({
      url: 'blokirajKorisnikaf',
      method: 'post',
      data: {
        osb_id : osb_id
      },
      params: {

        }
    });
  },
  // oznaciKorisnikaOkApi : function({id : id, limit : limit}){
  //   return axiosWithBaseUrlParams({
  //     url: 'oznaciKorisnikaOk',
  //     method: 'post',
  //     data: {
  //       osb_id : id
  //     }
  //   });
  // },
  pretraziKorisnikeApi: function(search){
    return axiosWithBaseUrlParams({
      url: 'searchApi',
      method: 'post',
      data: {
        search : search
      },
      params: {

        }
    });
  },
  sviKorisniciApi : function(upit){
    var limit = upit.limit;
    var start = upit.start;
    return axiosWithBaseUrlParams({
          url: 'sviKorisnici',
          method: 'post',
          data: {
            limit : limit,
            start : start
          },
          params: {

            }
        });
  },
    prijavljeniKomentariApi : function(upit){

    return axiosWithBaseUrlParams({
          url: 'prijavljeniKomentari',
          method: 'post',
          data: {

          },
          params: {

            }
        });
  },
  listaKategorijaApi : function(){
    return axiosWithBaseUrlParams({
      url: 'kategorijeApiForumCms',
      method: 'post',
      data: {

      },
      params: {

        }
    });
  },
  dodajKategorijuApi: function(kat){
    return axiosWithBaseUrlParams({
      url: 'dodajKategorijuF',
      method: 'post',
      data: {
        kat : kat
      },
      params: {

        }
    });
  },
  obirisKategorijuApi: function(selected){
    return axiosWithBaseUrlParams({
      url: 'obirisKategorijuf',
      method: 'post',
      data: {
        selected : selected
      },
      params: {

        }
    });
  },
  SviKomentariKorisnikaApi: function(osb_id){
    return axiosWithBaseUrlParams({
      url: 'prikazKomentaraCms',
      method: 'post',
      data: {
        osb_id : osb_id,
        prijavljen : 1
      },
      params:{}
    });
  },
  SviKomentariSvihKorisnikaApi: function(osb_id){
    return axiosWithBaseUrlParams({
      url: 'prikazKomentaraSvihKorisnikaCms',
      method: 'post',
      data: {
        osb_id : osb_id
      },
      params:{}
    });
  },
  odobriKomentarApi: function(pst_id){
    return axiosWithBaseUrlParams({
      url: 'odobriKomentarf',
      method: 'post',
      data: {
        pst_id : pst_id
      },
      params: {

        }
    });
  },
  blokirajKomentarApi: function(pst_id){
    return axiosWithBaseUrlParams({
      url: 'blokirajKomentarf',
      method: 'post',
      data: {
        pst_id : pst_id
      },
      params: {

        }
    });
  },
oznaciKorisnikaOkApi: function(id){
  return axiosWithBaseUrlParams({
    url: 'oznaciKorisnikaOk',
    method: 'post',
    data: {
      osb_id : id
    },
    params: {

      }
  });
},
vratiKorisnikaUZivot: function(osb_id){
  return axiosWithBaseUrlParams({
    url: 'vratiKorisnikaUZivotA',
    method: 'post',
    data: {
      osb_id : osb_id
    },
    params: {

      }
  });
},
postaviModeratoraApi: function(osb_id){
  return axiosWithBaseUrlParams({
    url: 'postaviModeratoraApi',
    method: 'post',
    data: {
      osb_id : osb_id
    },
    params: {

    }
  });
},
proveraPristupaApi: function(sid){
  return axiosWithBaseUrlParams({
    url: 'proveraPristupa',
    method: 'post',
    data: {
      sid : sid
    },
    params: {

    }
  });
},
usersLikesApi: function(sid){
  return axiosWithBaseUrlParams({
    url: 'usersLikes',
    method: 'post',
    data : {
      sid : sid
    },
    params : {
    }
  });
},
editCommApi: function(params){
  return axiosWithBaseUrlParams({
    url: 'editCommApi',
    method: 'post',
    data: {
      id : params.id,
      text: params.text,
      quote: params.quote
    },
    params: {

    }
  });
}

}
