import {axiosWithBaseUrlParams,axiosWithBaseUrlOnly} from './config.js'

export default {
  takeMyOneNew:function(params){
        var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'getOneNew',
      method:'get',
      params:{
        temaId:params.temaId,
        sid: sid
      }
    });
  },


  authorNews: function(params) {
    return axiosWithBaseUrlParams({
      url: 'vestiAutora',
      method: 'get',
      params: params
    })
  },

  allAuthorsApi: function(){
    return axiosWithBaseUrlOnly({
      url: 'getAuthors',
      method: 'POST'
    })
  },

getKategorijeApi: function(params){
return   axiosWithBaseUrlOnly({
    url:"getKategorijaVesti",
    method:"get",
    data: {

    }
  });
},

  takeCategoriesApi: function() {
    return  axiosWithBaseUrlOnly({
      url: 'optimistaKat',
      method: 'post',
      data: {

      }
    });
  },
  neodobreneVestiApi: function() {

    return axiosWithBaseUrlParams({
      url: 'neodobreneVesti',
      method: 'post',
      data: {
      },
      params: {

      }
    });
  },
  takePartners: function(params) {
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url: 'listaPartnera',
      method: 'get',
      params: {
        ofset:params.ofset,
        sid:sid,
        bannerState: params.bannerState
      }
    });
  },
  activateOrDesactivateBanner:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'listaPartnera',
      method:'patch',
      data:{
        bannerId:params.bannerId,
        action:params.action,
        sid: sid
      }
    });

  },
  insertBanner:function(params){
    return axiosWithBaseUrlOnly({
      url:'listaPartnera',
      method:'post',
      data:params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  changeBanner:function(params){
    return axiosWithBaseUrlOnly({
      url:'listaPartnera',
      method:'put',
      data:params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  searchBanner:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'searchBanner',
      method:'get',
      params:{
        text:params.text,
        state:params.state,
        sid: sid
      }
    })
  },
  getFooterBanners:function(){
    return axiosWithBaseUrlOnly({
      url:'getFooterBanners',
      method:'get'
    });
  },
  prijavljeniKorisniciApi: function() {
    return axiosWithBaseUrlParams({
      url: 'prijavljeniKorisnici',
      method: 'post',
      data: {
        vf:0
      },
      params: {

      }
    })
  },
  addViewToTheNew:function(params){
  return axiosWithBaseUrlOnly({
    url:'addViewToTheNew',
    method:'put',
    data:{
      temaId:params.temaId
    }
  });
  },
  slikaCms: function() {
    return axiosWithBaseUrlParams({
      url: 'slikaCms',
      method: 'post',
      data: {
        vf:0
      },
      params: {

      }
    })
  },



  prijavljeniKomentariApiV: function() {
    return axiosWithBaseUrlParams({
      url: 'prijavljeniKomentari',
      method: 'post',
      data: {

      },
      params: {

      }

    })
  },
  potencijalniAutoriApi: function() {
    return axiosWithBaseUrlParams({
      url: 'potencijalniAutori',
      method: 'post',
      data: {

      },
      params: {

      }
    })
  },

  moreNewsAuthorApi: function(params) {
    var id = params.authorId;
    var limit = params.limit;
    var start = params.start;
    return axiosWithBaseUrlParams({
      url: 'getAuthorNews',
      method: 'POST',
      data: {
        id: id,
        limit: limit,
        start: start
      },
      params: {

      }
    });
  },

  sviKorisniciApi: function(upit) {
    var limit = upit.limit;
    var start = upit.start;
    return axiosWithBaseUrlParams({
      url: 'sviKorisnici',
      method: 'post',
      data: {
        limit: limit,
        start: start
      },
      params: {

      }
    });
  },
  listaKategorijaApi_V: function() {
    return axiosWithBaseUrlParams({
      url: 'kategorijeCms',
      method: 'post',
      data: {
        vf : 0
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

  SviKomentariKorisnikaApi: function(osb_id) {
    return axiosWithBaseUrlParams({
      url: 'prikazKomentaraCms',
      method: 'post',
      data: {
        vf: 0,
        osb_id: osb_id,
        prijavljen: 1
      },
      params: {

      }
    });
  },
  SviKomentariSvihKorisnikaApi: function(osb_id) {
    return axiosWithBaseUrlParams({
      url: 'prikazKomentaraSvihKorisnikaCms',
      method: 'post',
      data: {
        vf: 0,
        osb_id: osb_id
      },
      params: {

      }
    });

  },


  checkUserLogApi:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:"checkLogUser",
      method:"post",
      data:{
        sid:sid
      }

    });

  },

  getCatIdApi: function(params){
    return axiosWithBaseUrlOnly({
      url:"najnovijeVesti",
      method:"post",
      data:{
        id:params.id,
        lim:params.limit,
        ofset:params.ofset
      }
    })
  },

  getCatTopIdApi: function(params){
    return  axiosWithBaseUrlOnly({
      url:"topRatedNews",
      method:"post",
      data:{
        id:params.id,
        lim:params.limit,
        ofset:params.ofset,
        filtrirano:params.filter

      }
    })
  },

  getVestiApi:function(params){
    return  axiosWithBaseUrlOnly({
    url:"najnovijeVesti",
    method:"post",
    data:{
      limitirano:params.lim,
      ofset:params.ofs,
      id:params.katId
    }

    })
  },

getTopNewsApi:function(params){
   return axiosWithBaseUrlOnly({
    url:"topRatedNews",
    method:'post',
    data:{
      filtrirano: params.filter,
      limitirano: params.limit,
      id:params.katId,
      // ofs:this.ofset
    }


  });
},

searchNewsApi:function(params){
  return  axiosWithBaseUrlOnly({
    url:"sApi",
    method:'post',
    data:{
      search:params.search,
      ofset:params.ofset
  }
})},
//kraj pocetnw strane

  mostPopularAuthorsApi: function(){
    return axiosWithBaseUrlOnly({
      url:'getPopAuthors',
      method: 'POST'
    });
  },

  commentOfTheDayApi: function(){
    return axiosWithBaseUrlOnly({
      url: 'commentOfTheDay',
      method: 'POST'
    });
  },
  oznaciKomentarOkApi: function(id) {
    return axiosWithBaseUrlParams({
      url: 'oznaciKomentarOkCms',
      method: 'post',
      data: {
        vf: 0,
        id: id
      },
      params: {

      }
    });
  },

  objaviTemuApi: function(tma_id) {
    return axiosWithBaseUrlParams({
      url: 'objaviTemuf',
      method: 'post',
      data: {
        tma_id: tma_id
      },
      params: {

      }
    });
  },
  obrisiTemuApi: function(tma_id) {
    return axiosWithBaseUrlParams({
      url: 'obrisiTemuf',
      method: 'post',
      data: {
        tma_id: tma_id
      },
      params: {

      }
    });
  },

  dorada: function(params) {
    var id = params.id;
    var obavestenje = params.obavestenje;
    // console.log("aksios "+obavestenje);
    // console.log("aksios "+id);
    return axiosWithBaseUrlParams({
      url: 'dorada',
      method: 'post',
      data: {
        id: id,
        obavestenje: obavestenje
      },
      params: {

      }
    });
  },

  blokirajKorisnikaApi: function(osb_id) {
    return axiosWithBaseUrlParams({
      url: 'blokirajKorisnikaf',
      method: 'post',
      data: {
        osb_id: osb_id
      },
      params: {

      }
    });
  },
  oznaciKorisnikaOkApi: function(id) {
    return axiosWithBaseUrlParams({
      url: 'oznaciKorisnikaOk',
      method: 'post',
      data: {
        osb_id: id
      },
      params: {

      }
    });
  },
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
  blokirajKomentarApi: function(pst_id) {
    return axiosWithBaseUrlParams({
      url: 'blokirajKomentarf',
      method: 'post',
      data: {
        pst_id: pst_id
      },
      params: {

      }
    });
  },
  vratiKorisnikaUZivot: function(osb_id) {
    return axiosWithBaseUrlParams({
      url: 'vratiKorisnikaUZivotA',
      method: 'post',
      data: {
        osb_id: osb_id
      },
      params: {

      }
    });
  },
  odrediAutoraApi: function(nesto) {
    var id = nesto.id;
    var odluka = nesto.odluka;
    return axiosWithBaseUrlParams({
      url: 'odrediAutora',
      method: 'post',
      data: {
        id: id,
        odluka: odluka
      },
      params: {

      }
    });
  },
  dodajKategorijuVestiApi: function(naziv) {

    return axiosWithBaseUrlParams({
      url: 'dodajKategorijuVesti',
      method: 'post',
      data: {
        naziv: naziv
      },
      params: {

      }
    });
  },
  zameniKategorijeApi: function(nesto) {
    var zaIzbacivanje = nesto.zaIzbacivanje;
    var zaUbacivanje = nesto.zaUbacivanje;
    return axiosWithBaseUrlParams({
      url: 'zameniKategorije',
      method: 'post',
      data: {
        zaIzbacivanje: zaIzbacivanje,
        zaUbacivanje: zaUbacivanje
      },
      params: {

      }
    });
  },

  insertNew: function(params) {
    return axiosWithBaseUrlOnly({
      url: 'insertNew',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  takeMyUnaprovedNews:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url: 'getUnaprovedNews',
      method: 'get',
      params: {
        sid:sid
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  takeOneNew:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'getOneNew',
      method:'get',
      params:{
        temaId:params.temaId,
        view:params.view,
        sid:sid
      }
    });
  },
  takeDeletedNews(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'getDeletedNews',
      method:'post',
      data:{
        ofset: params.ofset,
        sid:sid
      }
    });
  },
  changeNew:function(params){
    return axiosWithBaseUrlOnly({
      url:'insertNew',
      method:'put',
      data: params,
      headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
  },
  sendComment:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'sendComment',
      method:'post',
      data:{
        temaId:params.temaId,
        text:params.text,
        sid:sid
      }
    });
  },
  takeMyAprovedNews(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'getAprovedNews',
      method:'get',
      params:{
        ofset: params.ofset,
        sid:sid
      }
    })
  },
  takeRandomTags(){
    return axiosWithBaseUrlOnly({
      url:'getRandomTags',
      method:'get'
    });
  },
  takeTagRelatedNews:function(params){
    return axiosWithBaseUrlOnly({
      url:'getTagRelatedNews',
      method:'get',
      params:{
        temaId: params.temaId,
        ofset:params.ofset1
      }
    });
  },
  takeFirstComments:function(params){
    return axiosWithBaseUrlOnly({
      url:'getFirstComments',
      method:'get',
      params:{
        temaId: params.temaId,
        ofset:params.ofset,
        orderBy:params.orderBy
      }
    })
  },
  takeRepliesOnComment:function(params){
    return axiosWithBaseUrlOnly({
      url:'takeRepliesOnComment',
      method:'get',
      params:{
        postId: params.postId
      }
    })
  },
  reportComment:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'reportComment',
      method:'put',
      data:{
        postId:params.postId,
        sid:sid
      }
    })
  },
  answerUser:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'answerUser',
      method:'post',
      data:{
        postId:params.postId,
        temaId: params.temaId,
        text: params.text,
        sid:sid
      }
    })

  },
  addLikeNew:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'addLikeNew',
      method:'post',
      data:{
        temaId:params.temaId,
        sid:sid
      }

    })
  },
  addLikeComment:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'addLikeComment',
      method:'post',
      data:{
        postId:params.postId,
        sid:sid
      }
    })
  },
  takeImagesOnly:function(params){
    return axiosWithBaseUrlOnly({
      url:'getImagesOnly',
      method:'get',
      params:{
        temaId:params.temaId
      }
    })
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
  searchAuthorNews:function(params){
    var sid = localStorage.getItem('sid');
    return axiosWithBaseUrlOnly({
      url:'searchAuthorNews2',
      method:'get',
      params:{
        searchText:params.searchText,
        newsType:params.newsType,
        sid:sid
      }
    })
  },
  takeMainImageFromDBForChangeNew:function(params){
    return axiosWithBaseUrlOnly({
      url:'getMainImageForChangeNew',
      method:'get',
      params:{
        temaId:params.temaId
      }
    })
  },
  checkAuthorUserLogin:function(params){
    return axiosWithBaseUrlOnly({
      url:'checkAuthorUserLogin',
      method:'post',
      data:{
        sid:params.sid
      }
    })
  }
}
